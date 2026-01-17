import React, { useState } from 'react';
import { Send, Lock } from 'lucide-react';
import { Button } from '../../components/Button';
import { formatTime } from '../../utils/time';

/**
 * Encrypted operator communications - for sidebar use
 */
export const SecureChat = ({ messages = [], onSendMessage }) => {
  const [inputMessage, setInputMessage] = useState('');

  const handleSend = () => {
    if (inputMessage.trim() && onSendMessage) {
      onSendMessage(inputMessage.trim());
      setInputMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="h-full flex flex-col p-4">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto space-y-2 mb-4 min-h-0">
        {messages.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            <Lock size={32} className="mx-auto mb-2 opacity-50" />
            <p className="text-xs">No messages yet</p>
            <p className="text-xs text-slate-600 mt-1">Start a secure conversation</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div key={msg.id} className="border border-[#1a1a1a] bg-[#0a0a0a] rounded p-2">
              <div className="flex items-center justify-between mb-1">
                <span className="text-slate-300 font-semibold text-xs">{msg.operator}</span>
                <span className="text-slate-500 text-xs font-mono">
                  {formatTime(msg.timestamp)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                {msg.encrypted && (
                  <Lock size={10} className="text-slate-400" title="Encrypted" />
                )}
                <p className="text-slate-300 text-xs">{msg.message}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Input */}
      <div className="flex gap-2 border-t border-[#1a1a1a] pt-4">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Type message..."
          className="flex-1 px-2 py-1.5 bg-[#0a0a0a] border border-[#1a1a1a] text-xs text-slate-300 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-[#0088ff]/30"
        />
        <Button variant="primary" size="sm" onClick={handleSend} disabled={!inputMessage.trim()}>
          <Send size={12} />
        </Button>
      </div>
    </div>
  );
};
