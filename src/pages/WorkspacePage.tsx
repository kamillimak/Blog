import React, { useState, useEffect } from "react";
import { 
  Cloud, 
  FileText, 
  Search, 
  Plus, 
  ExternalLink, 
  ArrowRight, 
  Check, 
  File, 
  LogOut, 
  Loader2, 
  ChevronRight, 
  Copy, 
  Sparkles,
  RefreshCw,
  Clock,
  BookOpen,
  Pin,
  PinOff,
  Trash2,
  Edit3,
  Link2
} from "lucide-react";
import { initAuth, googleSignIn, logout } from "../utils/firebaseAuth";
import { User } from "firebase/auth";

interface GoogleFile {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink: string;
}

interface ConnectedDoc {
  id: string;
  name: string;
  mimeType: string;
  modifiedTime: string;
  webViewLink: string;
  notes?: string;
}

interface DocContent {
  title: string;
  body: string;
}

interface GoogleApiErrorPayload {
  error?: {
    code?: number;
    message?: string;
    status?: string;
  };
}

async function readGoogleApiError(response: Response, fallback: string): Promise<string> {
  try {
    const payload = (await response.json()) as GoogleApiErrorPayload;
    const details = payload.error?.message;
    const status = payload.error?.status;
    return [fallback, status, details].filter(Boolean).join(" — ");
  } catch {
    return `${fallback} — HTTP ${response.status}`;
  }
}

// Curated templates for AI creators
const DRAFT_TEMPLATES = [
  {
    id: "prompt_eng",
    title: "Inżynieria Promptów w Praktyce",
    category: "Workflow",
    description: "Kompleksowy szablon do projektowania zaawansowanych systemów promptów.",
    content: `# Poradnik: Zaawansowana Inżynieria Promptów na poziomie Repozytorium

Wprowadzenie do orkiestracji procesów i szablonów promptowania dla modeli Claude, Trae i Codex.

## 1. STRUKTURA PROMPTU METASYSTEMOWEGO
Poniżej znajduje się zalecany szablon, który pozwala ujednolicić zachowanie agentów w zespole:
- **Rola i Tożsamość:** Jasno określ, kim jest agent (np. Expert System Architect).
- **Kontekst Projektu:** Dostarcz schemat bazy lub strukturę katalogów.
- **Zasady Negatywne:** Co jest bezwzględnie zabronione (np. "Nie stosuj mocków").

## 2. METODOLOGIA FEW-SHOT IN-CONTEXT
Zawsze dostarczaj 2-3 wysokiej jakości przykłady wejścia i wyjścia, aby model załapał styl kodu i zasady projektowe bez zbędnego gadania.

## Podsumowanie
Praca z modelami to proces ciągłej iteracji.`
  },
  {
    id: "ai_agents_arch",
    title: "Architektura Agentów AI (Multi-Agent)",
    category: "Architektura",
    description: "Zarys i wzorzec projektowy integracji wielu wyspecjalizowanych modeli.",
    content: `# Analiza: Architektura Systemów Multi-Agentowych

Analiza podziału ról w nowoczesnym cyklu wytwórczym oprogramowania.

## 1. TRÓJKĄT KOMPETENCYJNY (CLAUDE - CODX - TRAE)
Wydajne środowisko deweloperskie rozdziela zadania według mocnych stron poszczególnych modeli:
1. **Claude (Architekt):** Projektuje schematy baz danych (np. Prisma/Drizzle) i modeluje relacje.
2. **Codex (Realizator):** Służy jako precyzyjny silnik piszący wydajne algorytmy i testy jednostkowe.
3. **Trae (Esteta UI):** Poleruje warstwę wizualną, dopracowuje mikro-interakcje i dba o spójność designu.

## 2. PRZEPŁYW DANYCH I BEZPIECZEŃSTWO
Dane przepływają asynchronicznie, a klucze API są trzymane wyłącznie po stronie serwera.`
  },
  {
    id: "ai_monetization",
    title: "Monetyzacja Produktów AI-Native",
    category: "Strategia",
    description: "Konkretny plan działania na wdrożenie i sprzedaż mikrousług opartych o API Gemini.",
    content: `# Strategia: Monetyzacja Narzędzi i Mikrousług AI-Native

Jak zidentyfikować niszę i wdrożyć rentowny mikro-SaaS w 48 godzin.

## 1. STRATEGIA "AIWRAPPER" Z WARTOŚCIĄ DODANĄ
Samo opakowanie API to za mało. Wartość dodana powstaje poprzez:
- **Głęboki Kontekst Branżowy:** Integracja z niszowymi narzędziami użytkownika.
- **Gotowe Integracje:** Automatyczne eksportowanie do Google Drive i Google Docs.
- **Intuicyjny UX:** Redukcja tarcia do jednego kliknięcia.`
  }
];

export function WorkspacePage() {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  
  // Drive and Docs States
  const [files, setFiles] = useState<GoogleFile[]>([]);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState<"all" | "docs">("all");
  
  // Selected Doc Preview State
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<DocContent | null>(null);
  const [loadingDoc, setLoadingDoc] = useState(false);
  const [copiedText, setCopiedText] = useState(false);

  // New Doc Generator State
  const [selectedTemplateId, setSelectedTemplateId] = useState("prompt_eng");
  const [customDocTitle, setCustomDocTitle] = useState("Nowy Szkic Promptu");
  const [creatingDoc, setCreatingDoc] = useState(false);
  const [createdDocLink, setCreatedDocLink] = useState<string | null>(null);
  const [createdDocTitle, setCreatedDocTitle] = useState<string | null>(null);
  const [workspaceError, setWorkspaceError] = useState<string | null>(null);

  // Connected Documents State (Saved to localStorage)
  const [connectedDocs, setConnectedDocs] = useState<ConnectedDoc[]>(() => {
    const saved = localStorage.getItem("workspace_connected_docs");
    return saved ? JSON.parse(saved) : [];
  });

  // Track currently edited notes ID
  const [editingNotesId, setEditingNotesId] = useState<string | null>(null);
  const [tempNotesValue, setTempNotesValue] = useState("");

  // Persist connected documents
  useEffect(() => {
    localStorage.setItem("workspace_connected_docs", JSON.stringify(connectedDocs));
  }, [connectedDocs]);

  // Connect or disconnect doc helper
  const handleToggleConnectDoc = (file: GoogleFile) => {
    const isConnected = connectedDocs.some(d => d.id === file.id);
    if (isConnected) {
      setConnectedDocs(prev => prev.filter(d => d.id !== file.id));
      if (editingNotesId === file.id) {
        setEditingNotesId(null);
      }
    } else {
      setConnectedDocs(prev => [...prev, {
        id: file.id,
        name: file.name,
        mimeType: file.mimeType,
        modifiedTime: file.modifiedTime,
        webViewLink: file.webViewLink,
        notes: ""
      }]);
    }
  };

  const handleStartEditingNotes = (doc: ConnectedDoc) => {
    setEditingNotesId(doc.id);
    setTempNotesValue(doc.notes || "");
  };

  const handleSaveNotes = (id: string) => {
    setConnectedDocs(prev => prev.map(d => d.id === id ? { ...d, notes: tempNotesValue } : d));
    setEditingNotesId(null);
  };

  // Initialize auth state
  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, accessToken) => {
        setUser(currentUser);
        setToken(accessToken);
        setLoading(false);
        if (accessToken) void fetchFiles(accessToken);
      },
      () => {
        setUser(null);
        setToken(null);
        setLoading(false);
      }
    );
    return () => unsubscribe();
  }, []);

  // Fetch Google Drive Files
  const fetchFiles = async (accessToken: string) => {
    setLoadingFiles(true);
    try {
      // Fetch documents & text files to keep focus
      const q = "mimeType = 'application/vnd.google-apps.document' or mimeType = 'text/plain'";
      const url = `https://www.googleapis.com/drive/v3/files?pageSize=35&q=${encodeURIComponent(q)}&fields=files(id,name,mimeType,modifiedTime,webViewLink)&orderBy=modifiedTime desc`;
      
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${accessToken}` }
      });

      if (!response.ok) {
        throw new Error("Błąd podczas pobierania plików z Google Drive");
      }

      const data = await response.json();
      setFiles(data.files || []);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleLogin = async () => {
    setLoading(true);
    setWorkspaceError(null);
    try {
      const result = await googleSignIn();
      if (result) {
        setUser(result.user);
        setToken(result.accessToken);
        fetchFiles(result.accessToken);
      }
    } catch (err) {
      console.error("Błąd logowania:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
      setToken(null);
      setFiles([]);
      setSelectedDocId(null);
      setDocContent(null);
      setCreatedDocLink(null);
    } catch (err) {
      console.error("Błąd wylogowywania:", err);
    } finally {
      setLoading(false);
    }
  };

  // Preview / Read Google Doc Content
  const handlePreviewDoc = async (fileId: string, fileName: string) => {
    if (!token) return;
    setSelectedDocId(fileId);
    setLoadingDoc(true);
    setDocContent(null);

    try {
      // Call Google Docs API v1 to fetch structural content
      const url = `https://www.googleapis.com/docs/v1/documents/${fileId}`;
      const response = await fetch(url, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (!response.ok) {
        throw new Error("Nie udało się odczytać dokumentu za pomocą Google Docs API");
      }

      const docData = await response.json();
      
      // Basic parser for Google Doc body content
      let textContent = "";
      if (docData.body && docData.body.content) {
        docData.body.content.forEach((element: any) => {
          if (element.paragraph && element.paragraph.elements) {
            element.paragraph.elements.forEach((el: any) => {
              if (el.textRun && el.textRun.content) {
                textContent += el.textRun.content;
              }
            });
          }
        });
      }

      setDocContent({
        title: docData.title || fileName,
        body: textContent || "Pusty dokument lub brak odczytywalnej treści."
      });
    } catch (error) {
      console.error("Docs API Error:", error);
      setDocContent({
        title: fileName,
        body: `Nie udało się załadować treści przez Google Docs API. Możliwe, że plik jest w formacie innym niż Google Docs.\n\nMożesz otworzyć go bezpośrednio: \n${files.find(f => f.id === fileId)?.webViewLink}`
      });
    } finally {
      setLoadingDoc(false);
    }
  };

  // Create Google Doc from Template
  const handleCreateDoc = async () => {
    if (!token) {
      setWorkspaceError("Sesja konta Google jest aktywna, ale dostęp do Drive wygasł. Kliknij „Połącz Drive ponownie” i spróbuj jeszcze raz.");
      return;
    }
    
    // Explicit Confirmation Dialog for mutating user data
    const confirmCreate = window.confirm(
      `Czy chcesz utworzyć nowy dokument o nazwie "${customDocTitle}" na swoim dysku Google Drive?`
    );
    if (!confirmCreate) return;

    setCreatingDoc(true);
    setCreatedDocLink(null);
    setWorkspaceError(null);

    try {
      // Create a native Google Doc in the user's Drive first. This makes the
      // destination explicit and avoids relying on Docs API creation semantics.
      const createResponse = await fetch("https://www.googleapis.com/drive/v3/files?fields=id,name,webViewLink", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: customDocTitle.trim(),
          mimeType: "application/vnd.google-apps.document"
        })
      });

      if (!createResponse.ok) {
        throw new Error(await readGoogleApiError(createResponse, "Nie udało się utworzyć dokumentu na Dysku Google"));
      }

      const newDoc = await createResponse.json();
      const documentId = newDoc.id;
      
      // Get template content
      const template = DRAFT_TEMPLATES.find(t => t.id === selectedTemplateId);
      const contentText = template ? template.content : "Pusty szkic artykułu.";

      // 2. Insert formatted content using batchUpdate
      const updateResponse = await fetch(`https://www.googleapis.com/docs/v1/documents/${documentId}:batchUpdate`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          requests: [
            {
              insertText: {
                location: { index: 1 },
                text: contentText
              }
            }
          ]
        })
      });

      if (!updateResponse.ok) {
        throw new Error(await readGoogleApiError(updateResponse, "Dokument utworzono, ale nie udało się dodać treści szablonu"));
      }

      setCreatedDocTitle(customDocTitle);
      setCreatedDocLink(`https://docs.google.com/document/d/${documentId}/edit`);
      
      // Refresh file list to include the newly created doc
      void fetchFiles(token);
    } catch (error) {
      console.error("Error creating Google Doc:", error);
      setWorkspaceError(error instanceof Error ? error.message : "Wystąpił nieznany błąd podczas tworzenia dokumentu.");
    } finally {
      setCreatingDoc(false);
    }
  };

  // Copy Imported Document Text to Clipboard
  const handleCopyText = () => {
    if (!docContent) return;
    navigator.clipboard.writeText(docContent.body);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  // Filter files based on type and search query
  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === "all" || file.mimeType === "application/vnd.google-apps.document";
    return matchesSearch && matchesType;
  });

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col justify-center items-center bg-brand-bg">
        <Loader2 className="animate-spin text-orange-500 mb-4" size={32} />
        <p className="text-sm font-mono text-brand-muted uppercase tracking-widest">Inicjalizacja modułu Workspace...</p>
      </div>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 scroll-mt-24">
      {/* HEADER SECTION */}
      <div className="border-b border-brand-border pb-8 mb-10">
        <div className="flex items-center gap-2 text-orange-500 font-extrabold text-[10px] tracking-[0.2em] uppercase mb-3">
          <Cloud size={12} />
          <span>Integracja Google Workspace</span>
        </div>
        <h1 className="font-sans font-extrabold text-4xl sm:text-5xl text-brand-text tracking-tighter uppercase mb-3">
          Strefa Twórcy
        </h1>
        <p className="font-serif text-lg text-brand-muted leading-relaxed max-w-3xl">
          Połącz swój blog z chmurą **Google Drive** oraz **Google Docs**. Twórz, edytuj i importuj swoje promptowe szkice oraz gotowe artykuły bezpośrednio z bezpiecznego poziomu platformy.
        </p>
      </div>

      {/* NOT AUTHENTICATED STATE */}
      {!user ? (
        <div className="border border-brand-border bg-brand-featured-bg p-8 sm:p-12 text-center max-w-3xl mx-auto my-12">
          <Cloud className="text-brand-muted/40 mx-auto mb-6" size={56} />
          <h2 className="font-sans font-bold text-2xl tracking-tight uppercase text-brand-text mb-4">
            Brak połączenia z Twoją chmurą Google
          </h2>
          <p className="font-serif text-brand-muted text-base leading-relaxed mb-8 max-w-lg mx-auto">
            Zaloguj się bezpiecznie kontem Google, aby odblokować dostęp do swoich plików na Dysku Google oraz uzyskać możliwość eksportu zarysów bezpośrednio do Google Docs.
          </p>

          <button 
            onClick={handleLogin}
            className="inline-flex items-center gap-3 bg-brand-text text-brand-bg px-6 py-4 border border-transparent font-sans text-xs uppercase font-extrabold tracking-widest hover:bg-brand-muted transition-colors"
          >
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" className="w-4 h-4 mr-1">
              <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
              <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
              <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
              <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
            </svg>
            Połącz z Google Workspace
          </button>
        </div>
      ) : (
        /* AUTHENTICATED WORKSPACE AREA */
        <div className="space-y-12">
          {/* USER ACCOUNT BAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-brand-featured-bg border border-brand-border p-5 gap-4">
            <div className="flex items-center gap-4">
              {user.photoURL ? (
                <img 
                  src={user.photoURL} 
                  alt={user.displayName || "Profil"} 
                  width={48}
                  height={48}
                  loading="lazy"
                  decoding="async"
                  className="w-12 h-12 rounded-full border border-brand-border"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center font-bold text-orange-600 border border-brand-border">
                  {user.displayName?.substring(0, 2).toUpperCase() || "KM"}
                </div>
              )}
              <div>
                <p className="font-sans text-xs uppercase font-extrabold text-brand-muted tracking-widest">Zalogowano jako</p>
                <h3 className="font-sans font-bold text-base text-brand-text">{user.displayName || user.email}</h3>
              </div>
            </div>
            
            <div className="flex gap-3">
              {token ? (
                <button 
                onClick={() => void fetchFiles(token)}
                className="flex items-center gap-2 border border-brand-border px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-text hover:bg-brand-border/20 transition-colors"
                title="Odśwież pliki"
              >
                <RefreshCw size={14} />
                <span>Odśwież</span>
              </button>
              ) : (
                <button
                  onClick={handleLogin}
                  className="flex items-center gap-2 border border-amber-500 bg-amber-500/10 px-4 py-2 text-xs font-bold uppercase tracking-widest text-amber-700 hover:bg-amber-500/20 transition-colors"
                >
                  <Cloud size={14} />
                  <span>Połącz Drive ponownie</span>
                </button>
              )}
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 border border-brand-border hover:border-red-500 hover:text-red-500 px-4 py-2 text-xs font-bold uppercase tracking-widest text-brand-muted transition-colors"
              >
                <LogOut size={14} />
                <span>Odłącz</span>
              </button>
            </div>
          </div>

          {!token && (
            <div className="border border-amber-500/60 bg-amber-500/10 p-4 text-sm text-amber-800">
              Konto Google pozostaje zalogowane. Ze względów bezpieczeństwa token Drive nie jest zapisywany w przeglądarce; po pełnym odświeżeniu strony trzeba jednorazowo odnowić dostęp przyciskiem powyżej.
            </div>
          )}

          {workspaceError && (
            <div role="alert" className="border border-red-500/60 bg-red-500/10 p-4 text-sm text-red-700 whitespace-pre-line">
              <strong className="block uppercase tracking-wider text-xs mb-1">Google Workspace — błąd</strong>
              {workspaceError}
            </div>
          )}

          {/* TWO COLUMN WORKSPACE GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* COLUMN LEFT: FILE EXPLORER (7 Cols) */}
            <div className="lg:col-span-7 space-y-6">
              <div className="border border-brand-border bg-brand-card p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="font-sans font-extrabold text-lg uppercase tracking-tight text-brand-text flex items-center gap-2">
                    <Cloud size={18} className="text-orange-500" />
                    Twoja chmura Google Drive
                  </h2>
                  <span className="font-mono text-xs text-brand-muted">
                    {filteredFiles.length} dokumentów
                  </span>
                </div>

                {/* SEARCH AND FILTER TOOLS */}
                <div className="flex flex-col sm:flex-row gap-3 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-brand-muted" size={16} />
                    <input 
                      type="text"
                      placeholder="Szukaj dokumentów..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-brand-border text-sm font-sans placeholder:text-brand-muted focus:border-brand-text focus:outline-none bg-brand-bg transition-colors"
                    />
                  </div>

                  <div className="flex border border-brand-border p-1 bg-brand-bg">
                    <button 
                      onClick={() => setFilterType("all")}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                        filterType === "all" ? "bg-brand-text text-brand-bg" : "text-brand-muted hover:text-brand-text"
                      }`}
                    >
                      Wszystkie
                    </button>
                    <button 
                      onClick={() => setFilterType("docs")}
                      className={`px-3 py-1.5 text-xs font-bold uppercase tracking-widest transition-colors ${
                        filterType === "docs" ? "bg-brand-text text-brand-bg" : "text-brand-muted hover:text-brand-text"
                      }`}
                    >
                      Google Docs
                    </button>
                  </div>
                </div>

                {/* FILE LISTING AREA */}
                {loadingFiles ? (
                  <div className="py-20 flex flex-col items-center">
                    <Loader2 className="animate-spin text-orange-500 mb-2" size={24} />
                    <span className="text-xs font-mono text-brand-muted uppercase">Wyszukiwanie plików...</span>
                  </div>
                ) : filteredFiles.length === 0 ? (
                  <div className="py-16 text-center border border-dashed border-brand-border bg-brand-featured-bg">
                    <FileText className="text-brand-muted/40 mx-auto mb-3" size={32} />
                    <p className="font-sans text-sm font-bold text-brand-text uppercase tracking-tight mb-1">Brak wyników</p>
                    <p className="font-serif text-xs text-brand-muted">Wpisz inną frazę lub utwórz swój pierwszy szkic po prawej stronie.</p>
                  </div>
                ) : (
                  <div className="divide-y divide-brand-border max-h-[460px] overflow-y-auto pr-2 custom-scrollbar">
                    {filteredFiles.map((file) => {
                      const isGoogleDoc = file.mimeType === "application/vnd.google-apps.document";
                      return (
                        <div 
                          key={file.id}
                          className={`py-3.5 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 transition-colors ${
                            selectedDocId === file.id ? "bg-orange-50/40 px-2 -mx-2 border-l-2 border-orange-500" : "hover:bg-brand-featured-bg/60"
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className="mt-0.5">
                              {isGoogleDoc ? (
                                <FileText className="text-blue-500" size={18} />
                              ) : (
                                <File className="text-amber-600" size={18} />
                              )}
                            </div>
                            <div>
                              <h4 className="font-sans font-bold text-sm text-brand-text leading-snug max-w-[280px] sm:max-w-[340px] truncate">
                                {file.name}
                              </h4>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-mono text-[9px] text-brand-muted uppercase">
                                  {isGoogleDoc ? "Google Docs" : "Plik Tekstowy"}
                                </span>
                                <span className="h-1 w-1 bg-brand-border rounded-full" />
                                <span className="font-mono text-[9px] text-brand-muted flex items-center gap-1">
                                  <Clock size={10} />
                                  {new Date(file.modifiedTime).toLocaleDateString("pl-PL")}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex gap-1.5 w-full sm:w-auto justify-end flex-wrap sm:flex-nowrap">
                            <button 
                              onClick={() => handleToggleConnectDoc(file)}
                              className={`flex-1 sm:flex-initial text-center border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors flex items-center justify-center gap-1 ${
                                connectedDocs.some(d => d.id === file.id)
                                  ? "bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100"
                                  : "bg-brand-bg text-brand-text border-brand-border hover:bg-brand-featured-bg hover:border-brand-text"
                              }`}
                              title={connectedDocs.some(d => d.id === file.id) ? "Połączono z projektem. Kliknij, aby odłączyć." : "Połącz z projektem"}
                            >
                              <Pin size={10} className={connectedDocs.some(d => d.id === file.id) ? "fill-emerald-600 text-emerald-600 animate-pulse" : ""} />
                              <span>{connectedDocs.some(d => d.id === file.id) ? "Połączono" : "Połącz"}</span>
                            </button>
                            <button 
                              onClick={() => handlePreviewDoc(file.id, file.name)}
                              className="flex-1 sm:flex-initial text-center bg-brand-featured-bg hover:bg-brand-border/40 text-brand-text border border-brand-border px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors"
                            >
                              Podgląd
                            </button>
                            <a 
                              href={file.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="bg-brand-text text-brand-bg hover:bg-brand-muted px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider flex items-center justify-center gap-1 transition-colors"
                            >
                              <ExternalLink size={10} />
                              Otwórz
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* DOCUMENT VIEW / IMPORT PREVIEW */}
              {selectedDocId && (
                <div className="border border-brand-border bg-brand-card p-6 relative">
                  {loadingDoc ? (
                    <div className="py-20 flex flex-col items-center justify-center">
                      <Loader2 className="animate-spin text-orange-500 mb-3" size={24} />
                      <p className="text-xs font-mono text-brand-muted uppercase tracking-widest">Pobieranie i dekodowanie Google Doc...</p>
                    </div>
                  ) : docContent ? (
                    <div className="space-y-4">
                      <div className="flex justify-between items-start gap-4 pb-4 border-b border-brand-border">
                        <div>
                          <span className="font-mono text-[9px] text-orange-500 font-bold uppercase tracking-widest">Zaimportowana treść z chmury</span>
                          <h3 className="font-sans font-extrabold text-lg text-brand-text uppercase tracking-tight mt-1">
                            {docContent.title}
                          </h3>
                        </div>

                        <div className="flex gap-2">
                          <button 
                            onClick={handleCopyText}
                            className="flex items-center gap-1 border border-brand-border hover:bg-brand-featured-bg text-brand-text px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest transition-colors"
                          >
                            {copiedText ? <Check size={12} className="text-green-600" /> : <Copy size={12} />}
                            <span>{copiedText ? "Skopiowano" : "Kopiuj"}</span>
                          </button>
                        </div>
                      </div>

                      {/* DOCUMENT BODY PREVIEW CONTAINER */}
                      <div className="bg-brand-featured-bg/40 border border-brand-border p-5 max-h-[350px] overflow-y-auto font-serif text-sm text-brand-text leading-relaxed whitespace-pre-wrap selection:bg-orange-100">
                        {docContent.body}
                      </div>
                      
                      <p className="text-[10px] font-mono text-brand-muted leading-relaxed">
                        💡 Powyższy szkic został bezpośrednio pobrany przez Google Docs API v1 z pominięciem jakichkolwiek serwerów proxy. Możesz skopiować go jako treść do nowego artykułu na blogu.
                      </p>
                    </div>
                  ) : null}
                </div>
              )}
            </div>

            {/* COLUMN RIGHT: GENERATOR (5 Cols) */}
            <div className="lg:col-span-5 space-y-6">
              {/* DRAFT CREATOR / EXPORTER */}
              <div className="border border-brand-border bg-brand-card p-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-orange-500/5 rounded-full blur-2xl pointer-events-none" />
                
                <h2 className="font-sans font-extrabold text-lg uppercase tracking-tight text-brand-text flex items-center gap-2 mb-4">
                  <Sparkles size={18} className="text-orange-500" />
                  Eksportuj szkice do Google Docs
                </h2>
                
                <p className="font-serif text-xs text-brand-muted leading-relaxed mb-6">
                  Wybierz jeden z gotowych, profesjonalnych zarysów metodologii i promptów, dostosuj nazwę i eksportuj bezpośrednio jako nowy dokument na swoim koncie Google Docs.
                </p>

                {/* TEMPLATE PICKER */}
                <div className="space-y-3 mb-6">
                  <label className="font-sans text-[10px] font-extrabold tracking-widest text-brand-muted uppercase block">
                    1. Wybierz szablon merytoryczny
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {DRAFT_TEMPLATES.map((tmpl) => (
                      <button 
                        key={tmpl.id}
                        onClick={() => {
                          setSelectedTemplateId(tmpl.id);
                          setCustomDocTitle(`Szkic: ${tmpl.title}`);
                        }}
                        className={`text-left border p-3.5 transition-[border-color,background-color,color,box-shadow,transform,opacity] duration-200 relative ${
                          selectedTemplateId === tmpl.id 
                            ? "border-brand-text bg-brand-featured-bg shadow-sm" 
                            : "border-brand-border hover:border-brand-text/50 bg-brand-bg/50"
                        }`}
                      >
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-sans font-extrabold text-xs text-brand-text uppercase tracking-tight">
                            {tmpl.title}
                          </span>
                          <span className="font-mono text-[8px] border border-brand-border px-1.5 py-0.5 uppercase text-brand-muted">
                            {tmpl.category}
                          </span>
                        </div>
                        <p className="font-serif text-[11px] text-brand-muted leading-relaxed">
                          {tmpl.description}
                        </p>
                        {selectedTemplateId === tmpl.id && (
                          <div className="absolute top-0 right-0 w-1.5 h-full bg-orange-500" />
                        )}
                      </button>
                    ))}
                  </div>
                </div>

                {/* CUSTOM DOCUMENT TITLE */}
                <div className="space-y-2 mb-6">
                  <label htmlFor="doc-title-input" className="font-sans text-[10px] font-extrabold tracking-widest text-brand-muted uppercase block">
                    2. Nazwa dokumentu w Google Docs
                  </label>
                  <input 
                    id="doc-title-input"
                    type="text"
                    value={customDocTitle}
                    onChange={(e) => setCustomDocTitle(e.target.value)}
                    className="w-full px-4 py-2.5 border border-brand-border text-xs font-sans placeholder:text-brand-muted focus:border-brand-text focus:outline-none bg-brand-bg"
                    placeholder="Wpisz nazwę dokumentu"
                  />
                </div>

                {/* SUBMIT EXPORT BUTTON */}
                <button 
                  onClick={handleCreateDoc}
                  disabled={creatingDoc || !customDocTitle.trim()}
                  className="w-full bg-brand-text text-brand-bg hover:bg-brand-muted px-5 py-3.5 border border-transparent font-sans text-xs uppercase font-extrabold tracking-widest flex items-center justify-center gap-2 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {creatingDoc ? (
                    <>
                      <Loader2 className="animate-spin" size={14} />
                      <span>Eksportowanie...</span>
                    </>
                  ) : (
                    <>
                      <Plus size={14} />
                      <span>Utwórz dokument w Google Docs</span>
                    </>
                  )}
                </button>

                {/* EXPORT SUCCESS CARD */}
                {createdDocLink && (
                  <div className="mt-5 border border-green-200 bg-green-50/50 p-4 space-y-3">
                    <div className="flex items-center gap-2 text-green-700">
                      <Check size={16} />
                      <span className="font-sans font-bold text-xs uppercase tracking-tight">Dokument wyeksportowany pomyślnie!</span>
                    </div>
                    <p className="font-serif text-[11px] text-green-800 leading-relaxed">
                      Dokument o nazwie <strong>"{createdDocTitle}"</strong> jest już dostępny w chmurze i gotowy do edycji przez dowolnego asystenta.
                    </p>
                    <a 
                      href={createdDocLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-green-700 hover:text-green-900 border-b border-green-700"
                    >
                      <span>Otwórz w Google Docs</span>
                      <ArrowRight size={12} />
                    </a>
                  </div>
                )}
              </div>

              {/* CONNECTED DOCUMENTS / AI PROJECT NOTES */}
              <div className="border border-brand-border bg-brand-card p-6 space-y-4">
                <div className="flex justify-between items-center pb-2 border-b border-brand-border">
                  <h2 className="font-sans font-extrabold text-sm uppercase tracking-widest text-brand-text flex items-center gap-2">
                    <Pin size={14} className="text-orange-500 fill-orange-500 animate-pulse" />
                    Powiązane Notatki i Projekty AI
                  </h2>
                  <span className="font-mono text-[10px] bg-orange-100 text-orange-800 px-2 py-0.5 rounded-full font-bold">
                    {connectedDocs.length} aktywnych
                  </span>
                </div>

                <p className="font-serif text-[11px] text-brand-muted leading-relaxed">
                  Zarządzaj powiązanymi zarysami i dokumentami projektowymi. Możesz dodawać własne instrukcje kontekstowe dla agentów AI, które zostaną zapisane w chmurze lokalnej projektu.
                </p>

                {connectedDocs.length === 0 ? (
                  <div className="py-8 text-center border border-dashed border-brand-border bg-brand-featured-bg/40 rounded-sm">
                    <Link2 className="text-brand-muted/40 mx-auto mb-2" size={24} />
                    <p className="font-sans text-xs font-bold text-brand-text uppercase tracking-tight mb-1">
                      Brak przypiętych dokumentów
                    </p>
                    <p className="font-serif text-[10px] text-brand-muted max-w-[240px] mx-auto leading-relaxed">
                      Kliknij przycisk <strong>„Połącz”</strong> przy plikach na liście po lewej, aby zarządzać nimi w tym miejscu.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 max-h-[400px] overflow-y-auto pr-1 custom-scrollbar">
                    {connectedDocs.map((doc) => (
                      <div key={doc.id} className="border border-brand-border bg-brand-featured-bg/40 p-3.5 space-y-3 relative group">
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex items-start gap-2 max-w-[80%]">
                            <FileText className="text-blue-500 mt-0.5 shrink-0" size={14} />
                            <div>
                              <h4 className="font-sans font-bold text-xs text-brand-text leading-snug break-words">
                                {doc.name}
                              </h4>
                              <p className="font-mono text-[8px] text-brand-muted mt-0.5">
                                Google Docs • Modyfikowano: {new Date(doc.modifiedTime).toLocaleDateString("pl-PL")}
                              </p>
                            </div>
                          </div>

                          <div className="flex gap-1.5 shrink-0">
                            <button 
                              onClick={() => handlePreviewDoc(doc.id, doc.name)}
                              className="text-brand-text hover:text-orange-500 p-1 bg-brand-bg border border-brand-border rounded transition-colors"
                              title="Załaduj podgląd dokumentu"
                            >
                              <FileText size={12} />
                            </button>
                            <a 
                              href={doc.webViewLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-brand-text hover:text-orange-500 p-1 bg-brand-bg border border-brand-border rounded transition-colors"
                              title="Otwórz plik na Dysku Google"
                            >
                              <ExternalLink size={12} />
                            </a>
                            <button 
                              onClick={() => handleToggleConnectDoc(doc as any)}
                              className="text-brand-text hover:text-red-500 p-1 bg-brand-bg border border-brand-border rounded transition-colors"
                              title="Odłącz dokument"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>

                        {/* Note/Management text area */}
                        <div className="border-t border-brand-border/60 pt-2.5">
                          {editingNotesId === doc.id ? (
                            <div className="space-y-2">
                              <label htmlFor={`notes-${doc.id}`} className="sr-only">Instrukcje deweloperskie</label>
                              <textarea 
                                id={`notes-${doc.id}`}
                                value={tempNotesValue}
                                onChange={(e) => setTempNotesValue(e.target.value)}
                                className="w-full p-2 border border-brand-border text-[11px] font-sans bg-brand-bg focus:border-brand-text focus:outline-none h-16 resize-none"
                                placeholder="Wpisz instrukcje deweloperskie lub cele dla Agenta AI..."
                              />
                              <div className="flex justify-end gap-1.5">
                                <button 
                                  onClick={() => setEditingNotesId(null)}
                                  className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider text-brand-muted hover:text-brand-text transition-colors"
                                >
                                  Anuluj
                                </button>
                                <button 
                                  onClick={() => handleSaveNotes(doc.id)}
                                  className="px-2 py-1 text-[9px] font-bold uppercase tracking-wider bg-brand-text text-brand-bg hover:bg-brand-muted transition-colors"
                                >
                                  Zapisz
                                </button>
                              </div>
                            </div>
                          ) : (
                            <div className="flex justify-between items-start gap-2 group/notes">
                              <div className="flex-1 font-serif text-[11px] leading-relaxed text-brand-muted italic">
                                {doc.notes ? (
                                  <p className="text-brand-text not-italic">{doc.notes}</p>
                                ) : (
                                  <span className="text-brand-muted/60">+ Dodaj instrukcje / cele dla Agenta...</span>
                                )}
                              </div>
                              <button 
                                onClick={() => handleStartEditingNotes(doc)}
                                className="opacity-0 group-hover/notes:opacity-100 hover:text-orange-500 p-0.5 transition-colors"
                                title="Edytuj notatki"
                              >
                                <Edit3 size={11} />
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* HOW IT WORKS / TIP CARD */}
              <div className="border border-brand-border bg-brand-featured-bg p-6 space-y-4">
                <h3 className="font-sans font-extrabold text-xs uppercase tracking-widest text-brand-text flex items-center gap-2">
                  <BookOpen size={14} className="text-orange-500" />
                  Jak to działa? — Rola agentów AI
                </h3>
                
                <div className="space-y-3 font-serif text-xs text-brand-muted leading-relaxed">
                  <p>
                    1. <strong>Zaloguj się:</strong> Przez bezpieczny popup Google Auth logujesz się i przesyłasz autoryzowany token dostępu do przeglądarki.
                  </p>
                  <p>
                    2. <strong>Pracuj z Codex i Trae:</strong> Kiedy wdrożysz tę strukturę na GitHubie i zaprosisz innych agentów AI (np. Codex lub Trae), mogą oni za pośrednictwem Twojego Google Workspace odczytywać pliki lub przygotowywać kolejne wpisy bezpośrednio jako pliki Google Docs.
                  </p>
                  <p>
                    3. <strong>Synchronizacja:</strong> Możesz napisać treść w Google Docs, zaimportować ją jednym przyciskiem "Podgląd" i wdrożyć na stronę bez ręcznego kopiowania kodu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
