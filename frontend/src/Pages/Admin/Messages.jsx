import React, { useState, useEffect } from "react";

// UI Components
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Badge } from "@Components/UI/Badge";
import { Input } from "@Components/UI/Input";

// Icons
import { ArrowRight, ArrowLeft, Check, X, Clock } from "lucide-react";

// Utilities
import { format } from "date-fns";

// Status config
const statusConfig = {
  sent: { color: "blue", icon: Clock },
  delivered: { color: "blue", icon: Check },
  read: { color: "emerald", icon: Check },
  failed: { color: "red", icon: X },
  pending: { color: "slate", icon: Clock },
};

// Maps for Tailwind-safe classes
const badgeColors = {
  blue: "bg-blue-100 text-blue-800",
  emerald: "bg-emerald-100 text-emerald-800",
  red: "bg-red-100 text-red-800",
  slate: "bg-slate-100 text-slate-800",
};

const directionColors = {
  outbound: "bg-blue-100",
  inbound: "bg-green-100",
};

// Dummy messages
const dummyMessages = [
  {
    id: 1,
    recipient_phone: "+1234567890",
    content_masked: "Hello, this is a test message...",
    message_type: "SMS",
    status: "sent",
    direction: "outbound",
    timestamp: new Date(),
    ai_generated: false,
  },
  {
    id: 2,
    recipient_phone: "+9876543210",
    content_masked: "AI-generated response",
    message_type: "WhatsApp",
    status: "read",
    direction: "inbound",
    timestamp: new Date(),
    ai_generated: true,
  },
  {
    id: 3,
    recipient_phone: "+1928374650",
    content_masked: "Another test message",
    message_type: "SMS",
    status: "delivered",
    direction: "outbound",
    timestamp: new Date(),
    ai_generated: false,
  },
];

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterTerm, setFilterTerm] = useState("");

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setMessages(dummyMessages);
      setIsLoading(false);
    }, 500);
  }, []);

  const filteredMessages = messages.filter(
    (msg) =>
      msg.recipient_phone.includes(filterTerm) ||
      msg.content_masked.toLowerCase().includes(filterTerm.toLowerCase())
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Real-time Message Feed</CardTitle>
        <p className="text-slate-500">Monitor all inbound and outbound messages.</p>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <Input
            placeholder="Filter by client ID, phone number, or content..."
            value={filterTerm}
            onChange={(e) => setFilterTerm(e.target.value)}
          />
        </div>
        <div className="space-y-4">
          {isLoading ? (
            <p>Loading messages...</p>
          ) : filteredMessages.length === 0 ? (
            <p className="text-center text-slate-500">No messages found.</p>
          ) : (
            filteredMessages.map((msg) => {
              const config = statusConfig[msg.status];
              const Icon = config.icon;
              return (
                <div
                  key={msg.id}
                  className="p-4 border rounded-lg flex items-start gap-4"
                >
                  <div
                    className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${directionColors[msg.direction]}`}
                  >
                    {msg.direction === "outbound" ? (
                      <ArrowRight className="w-4 h-4 text-blue-600" />
                    ) : (
                      <ArrowLeft className="w-4 h-4 text-green-600" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <p className="font-semibold">{msg.recipient_phone}</p>
                      <p className="text-xs text-slate-500">
                        {format(new Date(msg.timestamp), "MMM d, HH:mm:ss")}
                      </p>
                    </div>
                    <p className="text-sm text-slate-600 font-mono my-2 bg-slate-50 p-2 rounded">
                      {msg.content_masked}
                    </p>
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant="outline">{msg.message_type}</Badge>
                      <Badge
                        variant="secondary"
                        className={`${badgeColors[config.color]} flex items-center gap-1`}
                      >
                        <Icon className="w-3 h-3" />
                        {msg.status}
                      </Badge>
                      {msg.ai_generated && (
                        <Badge variant="outline">AI Generated</Badge>
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </CardContent>
    </Card>
  );
}