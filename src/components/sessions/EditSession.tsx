import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  User,
  FileText,
  Plus,
  X,
} from "lucide-react";
import { collection, doc, updateDoc, onSnapshot, getDoc, Timestamp } from "firebase/firestore";
import { db } from "../../config/firebase";
import { useAuth } from "../../contexts/AuthContext";
import type { Client, Session } from "../../types";

const EditSession: React.FC = () => {
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  const { id } = useParams<{ id: string }>();
  
  const [clients, setClients] = useState<Client[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    duration: 60,
    type: "one-on-one" as "one-on-one" | "group",
    clientIds: [] as string[],
    agenda: [""] as string[],
    status: "scheduled" as "scheduled" | "completed" | "cancelled"
  });
  
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch clients from Firestore
  useEffect(() => {
    const unsub = onSnapshot(collection(db, 'clients'), (snap) => {
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() } as Client));
      setClients(data);
    });
    return unsub;
  }, []);

  // Fetch session data
  useEffect(() => {
    const fetchSession = async () => {
      if (!id) return;
      
      try {
        const sessionDoc = await getDoc(doc(db, 'sessions', id));
        if (sessionDoc.exists()) {
          const sessionData = { id: sessionDoc.id, ...sessionDoc.data() } as Session;
          setSession(sessionData);
          
          // Populate form with session data
          setFormData({
            title: sessionData.title,
            description: sessionData.description,
            date: sessionData.date,
            time: sessionData.time,
            duration: sessionData.duration,
            type: sessionData.type,
            clientIds: sessionData.clientIds,
            agenda: sessionData.agenda.length > 0 ? sessionData.agenda : [""],
            status: sessionData.status
          });
        } else {
          setError("Session not found");
        }
      } catch (err: any) {
        console.error("Error fetching session:", err);
        setError("Failed to load session data");
      } finally {
        setLoading(false);
      }
    };

    fetchSession();
  }, [id]);

  const validateForm = () => {
    if (!currentUser) {
      setError("You must be signed in to edit a session");
      return false;
    }
    if (!formData.title.trim()) {
      setError("Session title is required");
      return false;
    }
    if (!formData.date) {
      setError("Session date is required");
      return false;
    }
    if (!formData.time) {
      setError("Session time is required");
      return false;
    }
    if (formData.clientIds.length === 0) {
      setError(
        `Please select at least one ${formData.type === "group" ? "participant" : "client"}`
      );
      return false;
    }
    if (formData.agenda.every(item => !item.trim())) {
      setError("Please provide at least one valid agenda item");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsSubmitting(true);

    if (!validateForm() || !id) {
      setIsSubmitting(false);
      return;
    }

    try {
      const sessionData = {
        ...formData,
        agenda: formData.agenda.filter(item => item.trim()),
        updatedAt: Timestamp.now(),
      };
      
      console.log("Updating session data:", sessionData);
      await updateDoc(doc(db, "sessions", id), sessionData);
      navigate("/sessions");
    } catch (err: any) {
      console.error("Error updating session:", err);
      setError(err.message || "Failed to update session");
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "duration" ? parseInt(value) : value,
    }));
  };

  const handleClientToggle = (clientId: string) => {
    setFormData((prev) => ({
      ...prev,
      clientIds: prev.clientIds.includes(clientId)
        ? prev.clientIds.filter((id) => id !== clientId)
        : formData.type === "one-on-one" 
          ? [clientId] // For one-on-one, replace the selection
          : [...prev.clientIds, clientId], // For group, add to selection
    }));
  };

  const addAgendaItem = () => {
    setFormData((prev) => ({
      ...prev,
      agenda: [...prev.agenda, ""],
    }));
  };

  const removeAgendaItem = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.filter((_, i) => i !== index),
    }));
  };

  const updateAgendaItem = (index: number, value: string) => {
    setFormData((prev) => ({
      ...prev,
      agenda: prev.agenda.map((item, i) => (i === index ? value : item)),
    }));
  };

  const selectedClients = clients.filter((client) =>
    formData.clientIds.includes(client.id)
  );

  if (!currentUser) {
    return <div className="text-red-600 p-6">Please sign in to edit a session</div>;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-gray-500">Loading session...</div>
      </div>
    );
  }

  if (error && !session) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={() => navigate('/sessions')}
          className="text-blue-600 hover:text-blue-700"
        >
          Back to sessions
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Error Display */}
      {error && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          {error}
        </div>
      )}

      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={() => navigate("/sessions")}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Edit {formData.type === "group" ? "Group" : "One-on-One"} Session
          </h1>
          <p className="text-gray-600">
            Update the session details and participants.
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Session Type Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Session Type
            </label>
            <div className="flex bg-gray-100 rounded-lg p-1">
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({
                    ...prev,
                    type: "one-on-one",
                    clientIds: prev.clientIds.slice(0, 1),
                  }))
                }
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  formData.type === "one-on-one"
                    ? "bg-white text-blue-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <User size={16} />
                <span>One-on-One</span>
              </button>
              <button
                type="button"
                onClick={() =>
                  setFormData((prev) => ({ ...prev, type: "group" }))
                }
                className={`flex-1 py-2 px-4 rounded-md text-sm font-medium transition-colors flex items-center justify-center space-x-2 ${
                  formData.type === "group"
                    ? "bg-white text-purple-600 shadow-sm"
                    : "text-gray-600 hover:text-gray-900"
                }`}
              >
                <Users size={16} />
                <span>Group Session</span>
              </button>
            </div>
          </div>

          {/* Session Title */}
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Session Title *
            </label>
            <input
              type="text"
              id="title"
              name="title"
              required
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter a descriptive title for the session"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
            />
          </div>

          {/* Session Description */}
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Description
            </label>
            <textarea
              id="description"
              name="description"
              rows={3}
              value={formData.description}
              onChange={handleChange}
              placeholder="Provide details about the session objectives and what will be covered"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Date */}
            <div>
              <label
                htmlFor="date"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Date *
              </label>
              <div className="relative">
                <Calendar
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="date"
                  id="date"
                  name="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Time */}
            <div>
              <label
                htmlFor="time"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Time *
              </label>
              <div className="relative">
                <Clock
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="time"
                  id="time"
                  name="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Duration */}
            <div>
              <label
                htmlFor="duration"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Duration (minutes) *
              </label>
              <select
                id="duration"
                name="duration"
                required
                value={formData.duration}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>60 minutes</option>
                <option value={90}>90 minutes</option>
                <option value={120}>120 minutes</option>
              </select>
            </div>

            {/* Status */}
            <div>
              <label
                htmlFor="status"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Status *
              </label>
              <select
                id="status"
                name="status"
                required
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              >
                <option value="scheduled">Scheduled</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          {/* Client Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {formData.type === "group"
                ? "Select Participants *"
                : "Select Client *"}
            </label>
            <div className="border border-gray-300 rounded-lg p-4 max-h-60 overflow-y-auto">
              {clients.length === 0 ? (
                <p className="text-gray-500 text-center py-4">
                  No clients found. Please add some clients first.
                </p>
              ) : (
                clients.map((client) => (
                  <div
                    key={client.id}
                    className="flex items-center space-x-3 py-2"
                  >
                    <input
                      type={formData.type === "one-on-one" ? "radio" : "checkbox"}
                      id={`client-${client.id}`}
                      name="clientIds"
                      checked={formData.clientIds.includes(client.id)}
                      onChange={() => handleClientToggle(client.id)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <img
                      src={client.avatar}
                      alt={client.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">
                        {client.name}
                      </p>
                      <p className="text-xs text-gray-500">{client.industry}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {selectedClients.length > 0 && (
              <div className="mt-3 p-3 bg-blue-50 rounded-lg">
                <p className="text-sm font-medium text-blue-900 mb-2">
                  Selected{" "}
                  {formData.type === "group" ? "Participants" : "Client"}:
                </p>
                <div className="flex flex-wrap gap-2">
                  {selectedClients.map((client) => (
                    <div
                      key={client.id}
                      className="flex items-center space-x-2 bg-white rounded-full px-3 py-1 border"
                    >
                      <img
                        src={client.avatar}
                        alt={client.name}
                        className="w-5 h-5 rounded-full object-cover"
                      />
                      <span className="text-sm text-gray-700">
                        {client.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Agenda */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-gray-700">
                Session Agenda
              </label>
              <button
                type="button"
                onClick={addAgendaItem}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
              >
                <Plus size={16} />
                <span>Add Item</span>
              </button>
            </div>
            <div className="space-y-3">
              {formData.agenda.map((item, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <FileText className="text-gray-400 flex-shrink-0" size={16} />
                  <input
                    type="text"
                    value={item}
                    onChange={(e) => updateAgendaItem(index, e.target.value)}
                    placeholder={`Agenda item ${index + 1}`}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                  />
                  {formData.agenda.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeAgendaItem(index)}
                      className="text-red-500 hover:text-red-700 p-1"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-200">
            <button
              type="submit"
              disabled={isSubmitting || formData.clientIds.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center justify-center space-x-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Updating Session...
                </>
              ) : (
                <>
                  <Calendar size={20} />
                  <span>Update Session</span>
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => navigate("/sessions")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-2 rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditSession;