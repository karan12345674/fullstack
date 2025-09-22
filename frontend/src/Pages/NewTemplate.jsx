import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import API_BASE_URL from "../config";
export default function NewTemplate() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState("");
  const [category, setCategory] = useState("Marketing");
  const [language, setLanguage] = useState("English");
  const [broadcastType, setBroadcastType] = useState("none");
  const [broadcastFile, setBroadcastFile] = useState(null);
  const [body, setBody] = useState("");
  const [footer, setFooter] = useState("");
  const [buttonType, setButtonType] = useState("none");
  const [ctaType, setCtaType] = useState("website");
  const [ctaButtonText, setCtaButtonText] = useState("");
  const [urlType, setUrlType] = useState("static");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [buttons, setButtons] = useState([]);
  const [quickReplyText, setQuickReplyText] = useState("");
  const [loading, setLoading] = useState(false);

  const BASE_URL = `${API_BASE_URL}/template`;

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios
        .get(`${BASE_URL}/${id}`, { withCredentials: true })
        .then((res) => {
          const t = res.data.template;
          setTemplateName(t.templateName);
          setCategory(t.category);
          setLanguage(t.language);
          setBroadcastType(t.broadcastType || "none");
          setBody(t.body || "");
          setFooter(t.footer || "");
          setButtonType(t.buttons?.length > 0 ? "call-to-action" : "none");
          setButtons(t.buttons || []);
        })
        .catch(() => toast.error("Failed to fetch template!"))
        .finally(() => setLoading(false));
    }
  }, [id]);

  const handleSubmit = async () => {
    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("templateName", templateName);
      formData.append("category", category);
      formData.append("language", language);
      formData.append("broadcastType", broadcastType);
      formData.append("body", body);
      formData.append("footer", footer);
      formData.append("buttons", JSON.stringify(buttons));
      if (broadcastFile) formData.append("file", broadcastFile);

      if (id) {
        await axios.put(`${BASE_URL}/${id}`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Template updated successfully!");
      } else {
        await axios.post(`${BASE_URL}/createTemplate`, formData, {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        });
        toast.success("Template created successfully!");
      }

      navigate("/dashboard/your-templates");
    } catch (err) {
      console.error(err);
      toast.error("Failed to save template!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      <main className="flex-1 p-4 md:p-6 flex flex-col lg:flex-row gap-6">
        {/* Left Form */}
        <div className="w-full lg:w-2/3 bg-white p-4 md:p-6 rounded-lg shadow border">
          <h1 className="text-2xl font-bold mb-6 text-gray-800">
            {id ? "Edit Template" : "New Template"}
          </h1>

          {/* Template Name */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Template Name"
            />
          </div>

          {/* Category & Language */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>Marketing</option>
                <option>Utility</option>
                <option>Authentication</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Language</label>
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                <option>English</option>
                <option>Hindi</option>
              </select>
            </div>
          </div>

          {/* Broadcast Type */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Broadcast Title</label>
            <div className="flex flex-wrap gap-4 mb-3">
              {["none", "text", "image", "video", "document"].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="broadcastType"
                    value={option}
                    checked={broadcastType === option}
                    onChange={(e) => {
                      setBroadcastType(e.target.value);
                      if (e.target.value === "none" || e.target.value === "text") setBroadcastFile(null);
                    }}
                    className="text-green-600"
                  />
                  <span className="capitalize">{option}</span>
                </label>
              ))}
            </div>

            {["image", "video", "document"].includes(broadcastType) && (
              <input
                type="file"
                accept={
                  broadcastType === "image"
                    ? "image/*"
                    : broadcastType === "video"
                    ? "video/*"
                    : ".pdf,.doc,.docx,.xls,.xlsx"
                }
                onChange={(e) => setBroadcastFile(e.target.files[0])}
                className="mt-2 block w-full text-sm text-gray-600"
              />
            )}
          </div>

          {/* Body */}
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Body</label>
            <textarea
              rows="4"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="w-full border rounded-lg px-3 py-2 focus:outline-none focus:ring focus:ring-green-300"
              placeholder="Write your template message..."
            ></textarea>
          </div>

          {/* Footer */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Footer (Optional)</label>
            <input
              type="text"
              value={footer}
              onChange={(e) => setFooter(e.target.value)}
              className="w-full border rounded-lg px-3 py-2"
              placeholder="Enter footer text"
            />
          </div>

          {/* Buttons Section */}
          <div className="mb-6">
            <label className="block text-sm font-medium mb-1">Buttons (Optional)</label>
            <div className="flex flex-wrap gap-4 mb-3">
              {["none", "call-to-action", "quick-reply"].map((option) => (
                <label key={option} className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="buttonType"
                    value={option}
                    checked={buttonType === option}
                    onChange={(e) => {
                      setButtonType(e.target.value);
                      setButtons([]);
                    }}
                    className="text-green-600"
                  />
                  <span className="capitalize">{option.replace("-", " ")}</span>
                </label>
              ))}
            </div>

            {/* Call To Action */}
            {buttonType === "call-to-action" && (
              <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                <div className="flex flex-wrap gap-6 items-center">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="ctaType"
                      value="website"
                      checked={ctaType === "website"}
                      onChange={(e) => setCtaType(e.target.value)}
                    />
                    Website Visit
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="ctaType"
                      value="phone"
                      checked={ctaType === "phone"}
                      onChange={(e) => setCtaType(e.target.value)}
                    />
                    Call Phone
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Button Text</label>
                  <input
                    type="text"
                    value={ctaButtonText}
                    onChange={(e) => setCtaButtonText(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter button text"
                  />
                </div>

                {ctaType === "website" && (
                  <div className="flex flex-col md:flex-row gap-4 items-center">
                    <div className="flex gap-3 items-center">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="urlType"
                          value="static"
                          checked={urlType === "static"}
                          onChange={(e) => setUrlType(e.target.value)}
                        />
                        Static
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="urlType"
                          value="dynamic"
                          checked={urlType === "dynamic"}
                          onChange={(e) => setUrlType(e.target.value)}
                        />
                        Dynamic
                      </label>
                    </div>
                    <input
                      type="text"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2 w-full"
                      placeholder="Enter website URL"
                    />
                  </div>
                )}

                <button
                  onClick={() => {
                    if (ctaButtonText) {
                      setButtons([
                        ...buttons,
                        {
                          type: ctaType,
                          text: ctaButtonText,
                          url: ctaType === "website" ? websiteUrl : "",
                        },
                      ]);
                      setCtaButtonText("");
                      setWebsiteUrl("");
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full md:w-auto"
                >
                  ➕ Add Button
                </button>
              </div>
            )}

            {/* Quick Reply */}
            {buttonType === "quick-reply" && (
              <div className="space-y-4 border p-4 rounded-lg bg-gray-50">
                <div>
                  <label className="block text-sm font-medium mb-1">Quick Reply Text</label>
                  <input
                    type="text"
                    value={quickReplyText}
                    onChange={(e) => setQuickReplyText(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2"
                    placeholder="Enter quick reply button text"
                  />
                </div>

                <button
                  onClick={() => {
                    if (quickReplyText) {
                      setButtons([...buttons, { type: "quick-reply", text: quickReplyText }]);
                      setQuickReplyText("");
                    }
                  }}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 w-full md:w-auto"
                >
                  ➕ Add Button
                </button>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-3">
            <button
              className="px-4 py-2 bg-gray-200 rounded-lg w-full md:w-auto"
              onClick={() => navigate("/dashboard/your-templates")}
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={loading}
              className={`px-4 py-2 text-white rounded-lg w-full md:w-auto ${
                loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
              }`}
            >
              {loading ? "Saving..." : id ? "Update Template" : "Save and Submit"}
            </button>
          </div>
        </div>

        {/* Right Preview */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-lg font-semibold mb-3">Preview</h2>
          <div className="bg-white rounded-lg shadow border p-4 flex flex-col items-center">
            <div className="w-full max-w-xs h-[500px] border rounded-2xl bg-gray-100 relative overflow-hidden flex flex-col">
              <div className="bg-green-600 h-12 flex items-center px-3 text-white font-semibold rounded-t-2xl">
                WhatsApp
              </div>

              <div className="p-3 text-sm space-y-3 flex-1 overflow-y-auto">
                <div className="bg-green-100 p-3 rounded-lg w-fit max-w-[85%] ml-auto shadow space-y-2">
                  {broadcastType !== "none" && (
                    <div className="bg-white border rounded-lg p-2 shadow-sm text-center text-gray-700 text-sm">
                      {broadcastType === "text" && <p>📄 Text Title</p>}
                      {broadcastType === "image" && broadcastFile ? (
                        <img
                          src={URL.createObjectURL(broadcastFile)}
                          alt="Uploaded"
                          className="max-h-40 mx-auto rounded"
                        />
                      ) : broadcastType === "image" ? (
                        <p>🖼 Image Attached</p>
                      ) : null}

                      {broadcastType === "video" && broadcastFile ? (
                        <video
                          controls
                          className="max-h-40 mx-auto rounded"
                          src={URL.createObjectURL(broadcastFile)}
                        />
                      ) : broadcastType === "video" ? (
                        <p>🎥 Video Attached</p>
                      ) : null}

                      {broadcastType === "document" && broadcastFile ? (
                        <p>📑 {broadcastFile.name}</p>
                      ) : broadcastType === "document" ? (
                        <p>📑 Document Attached</p>
                      ) : null}
                    </div>
                  )}
                  <p>{body}</p>
                  {footer && <p className="text-gray-500 text-xs">{footer}</p>}

                  {buttons.map((b, idx) => (
                    <button
                      key={idx}
                      className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm"
                    >
                      {b.text}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}