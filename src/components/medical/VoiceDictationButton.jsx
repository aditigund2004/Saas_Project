import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Square, RefreshCw, Check, AlertCircle, Volume2 } from 'lucide-react';

export function VoiceDictationButton({
  onTranscript,
  fieldName = 'field',
  className = ''
}) {
  const [isListening, setIsListening] = useState(false);
  const [interimText, setInterimText] = useState('');
  const [isSupported, setIsSupported] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const [isOpenPreview, setIsOpenPreview] = useState(false);

  const recognitionRef = useRef(null);

  useEffect(() => {
    // Check Web Speech API support
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      setIsSupported(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = 'en-IN'; // Indian English support

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event) => {
        let currentTranscript = '';
        for (let i = 0; i < event.results.length; i++) {
          currentTranscript += event.results[i][0].transcript;
        }
        setInterimText(currentTranscript);
      };

      recognition.onerror = (event) => {
        console.warn('[WebSpeech API] Recognition error:', event.error);
        if (event.error === 'not-allowed') {
          setErrorMessage('Microphone access denied. Please allow microphone permissions in your browser.');
        } else if (event.error === 'no-speech') {
          // Soft timeout, leave as is
        } else {
          setErrorMessage(`Speech recognition error (${event.error}). Please retry or type manually.`);
        }
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } catch (err) {
      console.warn('[WebSpeech API] Init error:', err);
      setIsSupported(false);
    }

    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {}
      }
    };
  }, []);

  const toggleListening = () => {
    if (!isSupported) {
      setErrorMessage('Speech recognition is not supported in this browser. Use Chrome, Edge, or Chromium-based browsers.');
      setIsOpenPreview(true);
      return;
    }

    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      setInterimText('');
      setErrorMessage(null);
      setIsOpenPreview(true);
      try {
        recognitionRef.current?.start();
      } catch (err) {
        console.warn('Recognition start error:', err);
      }
    }
  };

  const handleApply = () => {
    if (interimText.trim()) {
      onTranscript(interimText.trim());
    }
    setIsOpenPreview(false);
    if (isListening) {
      recognitionRef.current?.stop();
    }
  };

  const handleClear = () => {
    setInterimText('');
    if (!isListening && isSupported) {
      try {
        recognitionRef.current?.start();
      } catch {}
    }
  };

  return (
    <div className={`relative inline-block ${className}`}>
      <button
        type="button"
        onClick={toggleListening}
        className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
          isListening
            ? 'bg-rose-600 text-white animate-pulse shadow-md'
            : 'bg-blue-50 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/60 border border-blue-200 dark:border-blue-800'
        }`}
        title={isSupported ? `Dictate ${fieldName} with speech-to-text (en-IN)` : 'Speech recognition unsupported in this browser'}
      >
        {isListening ? (
          <>
            <Square className="w-3.5 h-3.5 fill-current" />
            <span>Listening (en-IN)...</span>
          </>
        ) : (
          <>
            <Mic className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
            <span>Voice Dictation</span>
          </>
        )}
      </button>

      {/* Live Dictation Modal / Popup Panel */}
      {isOpenPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3">
              <div className="flex items-center space-x-2">
                <div className={`p-2 rounded-xl ${isListening ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40' : 'bg-blue-100 text-blue-600 dark:bg-blue-900/40'}`}>
                  <Mic className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-sm text-slate-900 dark:text-white">Doctor Voice Dictation</h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">Speech-to-text targeting: {fieldName} (en-IN)</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => {
                  setIsOpenPreview(false);
                  if (isListening) recognitionRef.current?.stop();
                }}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 text-xs px-2 py-1"
              >
                Close
              </button>
            </div>

            {/* Error banner if permission or browser issue */}
            {errorMessage ? (
              <div className="p-3 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 rounded-xl text-rose-800 dark:text-rose-300 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold">Microphone / Speech Notice</p>
                  <p className="mt-0.5">{errorMessage}</p>
                </div>
              </div>
            ) : null}

            {/* Live Dictation Transcription Box */}
            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Live Transcription:</span>
                {isListening && (
                  <span className="flex items-center gap-1 text-[11px] font-bold text-rose-600">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    Recording active
                  </span>
                )}
              </div>
              <textarea
                value={interimText}
                onChange={(e) => setInterimText(e.target.value)}
                placeholder={isListening ? "Speak clearly into your microphone... (e.g. 'Patient presents with acute throbbing pain in lower molar...')" : "Press Start to begin speech recognition."}
                className="w-full h-32 p-3 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/60 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Educational disclaimer */}
            <div className="text-[10px] text-slate-400 bg-slate-50 dark:bg-slate-800/30 p-2.5 rounded-lg border border-slate-100 dark:border-slate-800">
              ℹ️ <strong>Clinical Note:</strong> Live speech recognition is powered by the browser Web Speech API. Audio is processed locally in real-time and is not recorded or stored remotely.
            </div>

            {/* Action Buttons */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center space-x-2">
                {isSupported && (
                  <button
                    type="button"
                    onClick={toggleListening}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 ${
                      isListening
                        ? 'bg-rose-100 text-rose-700 dark:bg-rose-900/50 hover:bg-rose-200'
                        : 'bg-blue-600 text-white hover:bg-blue-700'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <Square className="w-3.5 h-3.5 fill-current" /> Stop Listening
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5" /> Start Recording
                      </>
                    )}
                  </button>
                )}
                <button
                  type="button"
                  onClick={handleClear}
                  className="px-3 py-1.5 rounded-xl text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1"
                >
                  <RefreshCw className="w-3 h-3" /> Clear & Retry
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={handleApply}
                  disabled={!interimText.trim()}
                  className="px-4 py-1.5 rounded-xl text-xs font-bold bg-emerald-600 hover:bg-emerald-700 disabled:opacity-50 text-white flex items-center gap-1.5 cursor-pointer"
                >
                  <Check className="w-4 h-4" /> Insert into {fieldName}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

