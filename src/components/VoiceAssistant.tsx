import { useState, useCallback } from 'react';
import { Mic, X, Volume2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function VoiceAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');

  const toggleOpen = useCallback(() => {
    setIsOpen((prev) => !prev);
    if (isListening) {
      setIsListening(false);
      setTranscript('');
    }
  }, [isListening]);

  const startListening = useCallback(() => {
    setIsListening(true);
    setTranscript('');
    // Simulate listening
    setTimeout(() => {
      setTranscript('How can I check today\'s market prices?');
      setIsListening(false);
    }, 3000);
  }, []);

  const closeAssistant = useCallback(() => {
    setIsOpen(false);
    setIsListening(false);
    setTranscript('');
  }, []);

  return (
    <>
      {/* Floating Mic Button */}
      <motion.button
        onClick={toggleOpen}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full flex items-center justify-center shadow-voice transition-colors ${
          isListening ? 'bg-harvest-gold' : 'bg-krishiva-green'
        }`}
        aria-label="Voice Assistant"
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <Mic className="w-6 h-6 text-white" />
        )}
        {/* Pulse ring when listening */}
        {isListening && (
          <span className="absolute inset-0 rounded-full bg-krishiva-green animate-pulse-ring" />
        )}
        {/* Idle pulse */}
        {!isOpen && !isListening && (
          <span className="absolute inset-0 rounded-full bg-krishiva-green/30 animate-ping opacity-30" />
        )}
      </motion.button>

      {/* Expandable Assistant Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0, 0, 0.2, 1] as [number, number, number, number] }}
            className="fixed bottom-24 right-6 z-50 w-[340px] max-w-[calc(100vw-48px)] bg-white rounded-2xl shadow-xl border border-border-light overflow-hidden"
          >
            {/* Header */}
            <div className="bg-krishiva-green px-5 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h4 className="font-poppins font-semibold text-white text-sm">
                    KRISHIVA Assistant
                  </h4>
                  <p className="text-white/70 text-xs">
                    {isListening ? 'Listening...' : 'Tap mic to speak'}
                  </p>
                </div>
              </div>
              <button
                onClick={closeAssistant}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Body */}
            <div className="p-5">
              {/* Waveform animation when listening */}
              {isListening && (
                <div className="flex items-center justify-center gap-1 h-16 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1.5 bg-krishiva-green rounded-full"
                      animate={{
                        height: ['20%', '100%', '20%'],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.1,
                        ease: 'easeInOut',
                      }}
                      style={{ height: '20%' }}
                    />
                  ))}
                </div>
              )}

              {/* Transcript */}
              {transcript && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-bg-primary rounded-xl p-4 mb-4"
                >
                  <p className="text-text-primary text-sm">{transcript}</p>
                  <div className="mt-3 flex items-center gap-2 text-krishiva-green">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-xs font-medium">Tap to hear response</span>
                  </div>
                </motion.div>
              )}

              {/* Mic button in panel */}
              {!isListening && (
                <button
                  onClick={startListening}
                  className="w-full flex items-center justify-center gap-2 py-3 bg-bg-primary hover:bg-krishiva-green/5 rounded-xl transition-colors"
                >
                  <Mic className="w-5 h-5 text-krishiva-green" />
                  <span className="text-krishiva-green font-medium text-sm">Tap to Speak</span>
                </button>
              )}

              {/* Quick actions */}
              <div className="mt-4 grid grid-cols-2 gap-2">
                {[
                  'Market Prices',
                  'Weather',
                  'Book Labor',
                  'Crop Doctor',
                ].map((action) => (
                  <button
                    key={action}
                    className="px-3 py-2 bg-bg-primary hover:bg-krishiva-green/5 rounded-lg text-text-secondary hover:text-krishiva-green text-xs font-medium transition-colors text-center"
                  >
                    {action}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
