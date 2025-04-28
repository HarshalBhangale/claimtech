'use client';

import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Mail, Send, Paperclip, AlertCircle } from "lucide-react";
import { useMediaQuery } from "@/hooks/use-media-query";

// Mock data for testing
const mockMessages = [
  {
    id: 'msg_1',
    sender: 'Barclays Bank',
    subject: 'SAR Request Acknowledgment',
    date: '2023-10-16T09:00:00Z',
    content: 'We acknowledge receipt of your Subject Access Request. We will process this within the statutory timeframe of one month.',
    read: false,
    attachments: []
  },
  {
    id: 'msg_2',
    sender: 'Barclays Bank',
    subject: 'SAR Response',
    date: '2023-10-20T14:30:00Z',
    content: 'Please find attached the information you requested in your Subject Access Request.',
    read: true,
    attachments: [
      { name: 'SAR_Response.pdf', size: '2.4MB' }
    ]
  },
  {
    id: 'msg_3',
    sender: 'Barclays Bank',
    subject: 'Claim Response',
    date: '2023-10-25T11:15:00Z',
    content: 'We have reviewed your claim and would like to offer you a goodwill payment of £2,500.',
    read: true,
    attachments: [
      { name: 'Offer_Letter.pdf', size: '1.8MB' }
    ]
  }
];

export default function BuddyMailbox({ messages = mockMessages, onSendMessage }) {
  const [showNewMessageDialog, setShowNewMessageDialog] = useState(false);
  const [newMessage, setNewMessage] = useState({
    subject: '',
    content: '',
    attachments: []
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const handleSendMessage = async () => {
    setIsSubmitting(true);
    if (onSendMessage) {
      await onSendMessage(newMessage);
    }
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsSubmitting(false);
    setShowNewMessageDialog(false);
    setNewMessage({ subject: '', content: '', attachments: [] });
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setNewMessage({
      ...newMessage,
      attachments: [...newMessage.attachments, ...files.map(file => ({
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(1)}MB`
      }))]
    });
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-medium">Buddy Mailbox</h3>
        <Button
          variant="outline"
          onClick={() => setShowNewMessageDialog(true)}
          className="w-full sm:w-auto"
        >
          <Mail className="h-4 w-4 mr-2" />
          New Message
        </Button>
      </div>

      <div className="space-y-4">
        {messages.map((message) => (
          <Card
            key={message.id}
            className={`cursor-pointer hover:bg-accent ${
              !message.read ? 'border-primary' : ''
            }`}
          >
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <h4 className="font-medium">{message.subject}</h4>
                    <p className="text-sm text-muted-foreground">{message.sender}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {new Date(message.date).toLocaleDateString()}
                  </div>
                </div>
                <p className="text-sm">{message.content}</p>
                {message.attachments.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {message.attachments.map((attachment, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        <Paperclip className="h-3 w-3 mr-1" />
                        {isMobile ? attachment.name.split('.')[0] : attachment.name} ({attachment.size})
                      </Badge>
                    ))}
                  </div>
                )}
                {!message.read && (
                  <Badge variant="secondary" className="mt-2">
                    New
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={showNewMessageDialog} onOpenChange={setShowNewMessageDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>New Message</DialogTitle>
            <DialogDescription>
              Send a message to the lender regarding your claim
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Subject</label>
              <Input
                value={newMessage.subject}
                onChange={(e) => setNewMessage({ ...newMessage, subject: e.target.value })}
                placeholder="Enter message subject"
                className="w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Message</label>
              <Textarea
                value={newMessage.content}
                onChange={(e) => setNewMessage({ ...newMessage, content: e.target.value })}
                placeholder="Enter your message..."
                className="min-h-[150px] w-full"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Attachments</label>
              <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => document.getElementById('file-upload').click()}
                  className="w-full sm:w-auto"
                >
                  <Paperclip className="h-4 w-4 mr-2" />
                  Add Attachment
                </Button>
                <input
                  id="file-upload"
                  type="file"
                  multiple
                  className="hidden"
                  onChange={handleFileUpload}
                />
              </div>
              {newMessage.attachments.length > 0 && (
                <div className="mt-2 space-y-1">
                  {newMessage.attachments.map((attachment, index) => (
                    <div key={index} className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground truncate max-w-[200px]">
                        {attachment.name} ({attachment.size})
                      </span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setNewMessage({
                            ...newMessage,
                            attachments: newMessage.attachments.filter((_, i) => i !== index)
                          });
                        }}
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="flex flex-col sm:flex-row gap-2">
            <Button
              variant="outline"
              onClick={() => setShowNewMessageDialog(false)}
              className="w-full sm:w-auto"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSendMessage}
              disabled={isSubmitting || !newMessage.subject || !newMessage.content}
              className="w-full sm:w-auto"
            >
              <Send className="h-4 w-4 mr-2" />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 