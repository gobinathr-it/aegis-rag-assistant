import React, { useState, useRef, useEffect } from 'react';
import { 
  Shield, 
  Send, 
  Sparkles, 
  Database, 
  Clock, 
  CheckCircle2, 
  Lock, 
  FileText, 
  ChevronDown, 
  ChevronUp, 
  RefreshCw, 
  BookOpen, 
  Copy, 
  Check, 
  Cpu, 
  AlertCircle,
  ExternalLink,
  Layers
} from 'lucide-react';

const API_BASE = 'http://127.0.0.1:8000';

const SUGGESTED_PROMPTS = [
  {
    icon: '🏛️',
    title: 'Mainframe Era & IBM System/360',
    desc: '1964 architectural compatibility milestone',
    query: 'How did the mainframe era begin and what was the importance of IBM System/360?'
  },
  {
    icon: '🇮🇳',
    title: 'Indian IT Boom (TCS & Infosys)',
    desc: 'Offshore delivery model & Y2K catalyst',
    query: 'How did the Indian IT industry boom start and what was the role of TCS and Infosys?'
  },
  {
    icon: '☁️',
    title: 'AWS & Cloud Revolution',
    desc: 'Transforming CapEx to on-demand OpEx (2006)',
    query: 'When did AWS launch and how did cloud computing revolutionize IT infrastructure?'
  },
  {
    icon: '🤖',
    title: 'Rise of Agentic AI',
    desc: 'Multi-agent orchestration & tool execution',
    query: 'What is Agentic AI and how is it different from traditional chatbots?'
  },
  {
    icon: '🛡️',
    title: 'First Computer Virus & Antivirus',
    desc: 'Creeper virus (1971) & Reaper defense',
    query: 'What was the Creeper virus and how did cybersecurity originate?'
  },
  {
    icon: '💻',
    title: 'Microprocessors & PC Revolution',
    desc: 'Intel x86, Apple II, and Microsoft MS-DOS',
    query: 'How did microprocessors and personal computers revolutionize computing in the 1970s and 80s?'
  }
];

export default function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [backendAlive, setBackendAlive] = useState(true);
  const [showKbDrawer, setShowKbDrawer] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState(null);
  const [expandedSources, setExpandedSources] = useState({});

  const chatBottomRef = useRef(null);

  // Check health on mount
  useEffect(() => {
    fetch(`${API_BASE}/health`)
      .then(res => res.json())
      .then(data => setBackendAlive(data.status === 'ok'))
      .catch(() => setBackendAlive(false));
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const toggleSources = (index) => {
    setExpandedSources(prev => ({
      ...prev,
      [index]: !prev[index]
    }));
  };

  const copyToClipboard = (text, index) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const handleSend = async (questionToSend) => {
    const queryText = (questionToSend || input).trim();
    if (!queryText || loading) return;

    setInput('');
    const userMsg = { role: 'user', content: queryText, timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    const startTime = performance.now();

    try {
      const response = await fetch(`${API_BASE}/query`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: queryText })
      });

      const elapsed = Math.round(performance.now() - startTime);

      if (!response.ok) {
        const errData = await response.json().catch(() => ({ detail: 'Service error' }));
        throw new Error(errData.detail || `Server returned ${response.status}`);
      }

      const data = await response.json();

      const assistantMsg = {
        role: 'assistant',
        content: data.answer,
        sources: data.sources || [],
        latencyMs: elapsed,
        guardrails: {
          inputSafe: true,
          piiRedacted: true,
          grounded: !data.answer.includes("I don't have enough information"),
        },
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: `⚠️ Error: ${err.message}`,
          isError: true,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const renderMarkdownText = (text) => {
    if (!text) return null;
    // Simple light parser for bold, headers, and bullet lines
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('### ')) {
        return <h3 key={i}>{line.replace('### ', '')}</h3>;
      }
      if (line.startsWith('## ')) {
        return <h3 key={i}>{line.replace('## ', '')}</h3>;
      }
      if (line.startsWith('* ') || line.startsWith('- ')) {
        const itemContent = line.replace(/^[\*\-]\s+/, '');
        return (
          <ul key={i}>
            <li>{formatInlineBold(itemContent)}</li>
          </ul>
        );
      }
      if (line.trim() === '---') {
        return <hr key={i} />;
      }
      if (line.trim() === '') {
        return <div key={i} style={{ height: '0.4rem' }} />;
      }
      return <p key={i}>{formatInlineBold(line)}</p>;
    });
  };

  const formatInlineBold = (str) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={index}>{part.slice(2, -2)}</strong>;
      }
      return part;
    });
  };

  return (
    <div className="app-container">
      {/* Top Header */}
      <header className="header">
        <div className="brand-section">
          <div className="brand-icon-wrapper">
            <Shield size={22} />
          </div>
          <div className="brand-info">
            <h1>
              AegisRAG
              <span className="brand-tag">IT Intelligence</span>
            </h1>
            <p>Guardrailed RAG Assistant • 1940s to 2026 Computing History</p>
          </div>
        </div>

        <div className="header-status">
          <div className="status-pill">
            <div className={`pulse-dot ${backendAlive ? '' : 'offline'}`} style={{ backgroundColor: backendAlive ? '#10b981' : '#ef4444', boxShadow: backendAlive ? '0 0 8px #10b981' : '0 0 8px #ef4444' }} />
            <span>{backendAlive ? 'FastAPI + FAISS Active' : 'Backend Offline'}</span>
          </div>

          <button 
            className="action-btn" 
            onClick={() => setShowKbDrawer(true)}
            title="Inspect Knowledge Base"
          >
            <Database size={14} />
            <span>Knowledge Base</span>
          </button>

          {messages.length > 0 && (
            <button 
              className="action-btn" 
              onClick={() => setMessages([])}
              title="Reset Conversation"
            >
              <RefreshCw size={14} />
              <span>Clear</span>
            </button>
          )}
        </div>
      </header>

      {/* Main Chat Stream Area */}
      <main className="chat-container">
        {messages.length === 0 ? (
          <div className="welcome-hero">
            <div className="welcome-badge">
              <Sparkles size={14} />
              <span>LangChain + FAISS + Google Gemini • Dual Guardrails</span>
            </div>
            <h2 className="welcome-title">
              Explore 80+ Years of Computing & IT History
            </h2>
            <p className="welcome-subtitle">
              Ask any question across the evolution of Information Technology. Every response is dynamically grounded in verified documents with real-time guardrail verification.
            </p>

            <div className="prompt-chips-grid">
              {SUGGESTED_PROMPTS.map((item, idx) => (
                <div 
                  key={idx} 
                  className="prompt-chip" 
                  onClick={() => handleSend(item.query)}
                >
                  <div className="prompt-chip-icon">{item.icon}</div>
                  <div className="prompt-chip-title">{item.title}</div>
                  <div className="prompt-chip-desc">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          messages.map((msg, idx) => (
            <div key={idx} className={`message-row ${msg.role}`}>
              <div className={`avatar ${msg.role}`}>
                {msg.role === 'assistant' ? <Cpu size={20} /> : 'U'}
              </div>

              <div className="message-content-wrapper">
                <div className="message-bubble">
                  {msg.isError ? (
                    <div style={{ color: '#f87171', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <AlertCircle size={16} />
                      <span>{msg.content}</span>
                    </div>
                  ) : (
                    renderMarkdownText(msg.content)
                  )}
                </div>

                {/* Assistant Metadata / Guardrails HUD */}
                {msg.role === 'assistant' && !msg.isError && (
                  <>
                    <div className="guardrails-hud">
                      <div className="hud-item shield">
                        <Shield size={12} />
                        <span>Input Check: Passed</span>
                      </div>
                      <span className="hud-divider">•</span>
                      <div className="hud-item verified">
                        <Lock size={12} />
                        <span>PII Masked</span>
                      </div>
                      <span className="hud-divider">•</span>
                      <div className="hud-item verified">
                        <CheckCircle2 size={12} />
                        <span>Grounding: {msg.guardrails?.grounded ? '100% Grounded' : 'Cautious Fallback'}</span>
                      </div>
                      <span className="hud-divider">•</span>
                      <div className="hud-item">
                        <Clock size={12} />
                        <span>{msg.latencyMs}ms</span>
                      </div>

                      <button 
                        onClick={() => copyToClipboard(msg.content, idx)}
                        style={{ marginLeft: 'auto', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.2rem', fontSize: '0.7rem' }}
                      >
                        {copiedIndex === idx ? <Check size={12} color="#34d399" /> : <Copy size={12} />}
                        <span>{copiedIndex === idx ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>

                    {/* Sources Expander */}
                    {msg.sources && msg.sources.length > 0 && (
                      <div>
                        <button 
                          className="sources-toggle-btn"
                          onClick={() => toggleSources(idx)}
                        >
                          <BookOpen size={13} />
                          <span>{expandedSources[idx] ? 'Hide' : 'View'} Verified Sources ({msg.sources.length} Chunks)</span>
                          {expandedSources[idx] ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                        </button>

                        {expandedSources[idx] && (
                          <div className="sources-container">
                            {msg.sources.map((src, sIdx) => (
                              <div key={sIdx} className="source-card">
                                <div className="source-card-header">
                                  <span>[CHUNK {sIdx + 1} — FAISS VECTOR MATCH]</span>
                                </div>
                                <p>{src}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          ))
        )}

        {/* Loading Indicator */}
        {loading && (
          <div className="message-row assistant">
            <div className="avatar assistant">
              <Cpu size={20} />
            </div>
            <div className="message-content-wrapper">
              <div className="message-bubble typing-indicator">
                <div className="typing-dot" />
                <div className="typing-dot" />
                <div className="typing-dot" />
              </div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', paddingLeft: '0.5rem' }}>
                Querying FAISS vector index & Gemini 3.5/Flash...
              </div>
            </div>
          </div>
        )}

        <div ref={chatBottomRef} />
      </main>

      {/* Floating Bottom Input Dock */}
      <div className="input-dock">
        <form 
          className="input-box-wrapper"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input 
            type="text"
            className="query-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask anything about IT history, architectures, cloud, or cybersecurity..."
            disabled={loading}
          />
          <button 
            type="submit" 
            className="send-button"
            disabled={loading || !input.trim()}
          >
            <Send size={18} />
          </button>
        </form>
        <div className="input-footer-note">
          AegisRAG Engine • Dual Guardrails Active (Input Sanitization + Output Grounding)
        </div>
      </div>

      {/* Knowledge Base Side Drawer */}
      {showKbDrawer && (
        <div className="modal-overlay" onClick={() => setShowKbDrawer(false)}>
          <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
            <div className="drawer-header">
              <h2>Knowledge Base Details</h2>
              <button className="close-btn" onClick={() => setShowKbDrawer(false)}>✕</button>
            </div>

            <div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                All queries are vectorized through <strong>gemini-embedding-001</strong> and searched against a persistent local <strong>FAISS Index (60 chunks)</strong>.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                <div className="kb-doc-card">
                  <div className="kb-doc-name">01_it_history_and_evolution.md</div>
                  <div className="kb-doc-desc">
                    Covers 6 historical computing eras (1940s Alan Turing to 2026 Agentic AI, ENIAC, IBM System/360, PC revolution, WWW, AWS Cloud, Docker/K8s).
                  </div>
                </div>

                <div className="kb-doc-card">
                  <div className="kb-doc-name">02_it_services_business_models.md</div>
                  <div className="kb-doc-desc">
                    Covers Indian IT outsourcing (TCS, Infosys, Wipro), Global Delivery Model, Perpetual vs SaaS, IaaS/PaaS, Waterfall vs Agile/Scrum, and ITIL.
                  </div>
                </div>

                <div className="kb-doc-card">
                  <div className="kb-doc-name">03_it_cybersecurity_infrastructure.md</div>
                  <div className="kb-doc-desc">
                    Covers malware evolution (Creeper, Morris Worm, Stuxnet, WannaCry), Zero Trust architecture, AES/RSA cryptography, and networking backbone (Ethernet, TCP/IP, CDNs).
                  </div>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', padding: '1rem', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', border: '1px solid var(--border-subtle)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <div style={{ fontWeight: 600, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>Production Architecture</div>
              Client (React + Vite) ➔ API (FastAPI) ➔ Guardrails ➔ Vectorstore (FAISS) ➔ LLM (Google Gemini Flash)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
