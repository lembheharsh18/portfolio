'use client'

import { useState, useRef, useEffect, useCallback, KeyboardEvent } from 'react'
import { useTheme } from '@/components/ThemeProvider'

interface Line {
  id: number
  type: 'input' | 'output'
  content: string
}

let lineId = 0

const WELCOME = `Welcome to Harsh's portfolio terminal!
Type 'help' to see available commands.
`

const HELP = `Available commands:

  about        Learn about me
  skills       View my tech stack
  projects     Browse my projects
  experience   See my work history
  contact      Get my contact info
  social       Social media links
  resume       Download my resume
  theme <mode> Toggle dark / light theme
  neofetch     System information
  clear        Clear terminal
  echo <text>  Echo a message
  date         Current date & time
  pwd          Print working directory
  ls [dir]     List files
  cat <file>   Read a file
  cd <section> Navigate to a section
  open <proj>  Open project on GitHub
  history      Command history

Type any command to get started!`

const ABOUT = `┌─────────────────────────────────────────┐
│  Harsh Lembhe                           │
│  Full Stack Developer & CP Expert       │
│                                         │
│  📍 Pune, India                         │
│  🎓 B.E. AI & DS @ PICT (CGPA 9.43)    │
│  💼 SWE Intern @ Microcut Technology    │
│                                         │
│  Building scalable systems &            │
│  solving complex problems.              │
└─────────────────────────────────────────┘`

const SKILLS = `┌── Languages ─────────────────────────┐
│ Java • C++ • Python • JavaScript     │
│ TypeScript • SQL                     │
├── Frontend ──────────────────────────┤
│ React • Next.js • Tailwind CSS       │
├── Backend ───────────────────────────┤
│ Spring Boot • Node.js • Express      │
├── Database ──────────────────────────┤
│ PostgreSQL • MongoDB • Pinecone      │
├── DevOps ────────────────────────────┤
│ Docker • Kubernetes • AWS • Git      │
├── AI / ML ───────────────────────────┤
│ RAG • LLMs • Gemini API             │
└──────────────────────────────────────┘`

const PROJECTS = `╔════════════════════════════════════════╗
║  MY PROJECTS                           ║
╠════════════════════════════════════════╣
║                                        ║
║  01 │ DocuChat                         ║
║     │ RAG Document Intelligence        ║
║     │ Next.js · Python · Gemini        ║
║                                        ║
║  02 │ CoderSphere                      ║
║     │ Community Hub                    ║
║     │ React · Node.js · Socket.io      ║
║                                        ║
║  03 │ Portfolio v2                     ║
║     │ This website                     ║
║     │ Next.js · Framer Motion          ║
║                                        ║
╚════════════════════════════════════════╝

Type 'open <name>' to view on GitHub.`

const EXPERIENCE = `┌─ Work Experience ──────────────────────────┐
│                                            │
│  Microcut Technology                       │
│  Software Engineer Intern                  │
│  Jan 2026 – Apr 2026                      │
│                                            │
│  • Enterprise backend (Spring Boot)        │
│  • CI/CD pipelines (Docker, Kubernetes)    │
│  • System architecture & API design        │
│                                            │
└────────────────────────────────────────────┘`

const CONTACT = `📧  Email:    lembheharsh0508@gmail.com
📱  Phone:    +91 8625923006
📍  Location: Pune, Maharashtra, India

Type 'social' to see social media links.`

const SOCIAL = `🐙  GitHub     → github.com/lembheharsh18
💼  LinkedIn   → linkedin.com/in/harsh-lembhe-53b900277
⚡  LeetCode   → leetcode.com/u/harsh_lembhe18
📊  Codeforces → codeforces.com/profile/Harsh_Lembhe18`

const LS_ROOT = `about.txt     skills.txt     projects/
experience.txt  contact.txt    resume.pdf
social.txt    README.md`

const LS_PROJECTS = `docuchat/   codersphere/   portfolio-v2/`

const CAT_FILES: Record<string, string> = {
  'about.txt': ABOUT,
  'skills.txt': SKILLS,
  'experience.txt': EXPERIENCE,
  'contact.txt': CONTACT,
  'social.txt': SOCIAL,
  'README.md': `# Harsh Lembhe's Portfolio

Welcome to my interactive portfolio terminal!
Type 'help' for available commands.`,
  'resume.pdf': `This is a binary file. Use the 'resume' command to download it.`,
}

const PROJECT_URLS: Record<string, string> = {
  docuchat: 'https://github.com/lembheharsh18/docuchat',
  codersphere: 'https://github.com/lembheharsh18/coder-sphere-connect',
  'portfolio-v2': 'https://github.com/lembheharsh18/portfolio',
  portfolio: 'https://github.com/lembheharsh18/portfolio',
}

const SECTIONS = ['home', 'about', 'profiles', 'skills', 'projects', 'experience', 'contact']

export default function TerminalWidget({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme()
  const [lines, setLines] = useState<Line[]>([
    { id: lineId++, type: 'output', content: WELCOME },
  ])
  const [input, setInput] = useState('')
  const [cmdHistory, setCmdHistory] = useState<string[]>([])
  const [histIdx, setHistIdx] = useState(-1)
  const scrollRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [lines])

  const addOutput = useCallback((content: string) => {
    setLines((prev) => [...prev, { id: lineId++, type: 'output', content }])
  }, [])

  const processCommand = useCallback(
    (raw: string) => {
      const trimmed = raw.trim()
      if (!trimmed) return

      // Echo the input
      setLines((prev) => [
        ...prev,
        { id: lineId++, type: 'input', content: trimmed },
      ])

      const [cmd, ...rest] = trimmed.split(/\s+/)
      const arg = rest.join(' ')

      switch (cmd.toLowerCase()) {
        case 'help':
          addOutput(HELP)
          break

        case 'about':
        case 'whoami':
          addOutput(ABOUT)
          break

        case 'skills':
          addOutput(SKILLS)
          break

        case 'projects':
          addOutput(PROJECTS)
          break

        case 'experience':
        case 'work':
          addOutput(EXPERIENCE)
          break

        case 'contact':
          addOutput(CONTACT)
          break

        case 'social':
          addOutput(SOCIAL)
          break

        case 'resume': {
          const link = document.createElement('a')
          link.href = '/resume.pdf'
          link.download = 'Harsh_Lembhe_Resume.pdf'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
          addOutput('📄 Downloading resume (Harsh_Lembhe_Resume.pdf)…')
          break
        }

        case 'clear':
          setLines([])
          break

        case 'echo':
          addOutput(arg || '')
          break

        case 'date':
          addOutput(
            new Date().toLocaleString('en-IN', {
              timeZone: 'Asia/Kolkata',
              dateStyle: 'full',
              timeStyle: 'long',
            })
          )
          break

        case 'pwd':
          addOutput('/home/harsh/portfolio')
          break

        case 'ls':
          if (
            arg === 'projects' ||
            arg === 'projects/' ||
            arg === './projects'
          ) {
            addOutput(LS_PROJECTS)
          } else {
            addOutput(LS_ROOT)
          }
          break

        case 'cat': {
          const file = CAT_FILES[arg]
          if (file) {
            addOutput(file)
          } else if (!arg) {
            addOutput('Usage: cat <filename>')
          } else {
            addOutput(`cat: ${arg}: No such file or directory`)
          }
          break
        }

        case 'cd': {
          if (!arg || arg === '~' || arg === '/') {
            addOutput('harsh@portfolio:~$')
            break
          }
          const section = arg.toLowerCase().replace('/', '')
          if (SECTIONS.includes(section)) {
            document
              .getElementById(section)
              ?.scrollIntoView({ behavior: 'smooth' })
            addOutput(`Navigating to /${section}…`)
          } else {
            addOutput(`cd: ${arg}: No such directory\nTry: ${SECTIONS.join(', ')}`)
          }
          break
        }

        case 'open': {
          const url = PROJECT_URLS[arg.toLowerCase()]
          if (url) {
            window.open(url, '_blank', 'noopener,noreferrer')
            addOutput(`Opening ${arg} on GitHub…`)
          } else if (!arg) {
            addOutput('Usage: open <project>\nAvailable: docuchat, codersphere, portfolio')
          } else {
            addOutput(
              `open: ${arg}: project not found\nAvailable: docuchat, codersphere, portfolio`
            )
          }
          break
        }

        case 'theme': {
          if (arg === 'dark' || arg === 'light') {
            if (arg !== theme) toggleTheme()
            addOutput(`Theme switched to ${arg}.`)
          } else {
            addOutput(`Current theme: ${theme}\nUsage: theme <dark|light>`)
          }
          break
        }

        case 'neofetch':
          addOutput(
            `   _   _  _     harsh@portfolio
  | | | || |    ──────────────────────
  | |_| || |    OS: Next.js 14 / Web
  |  _  || |    Host: harshlembhe.dev
  | | | || |_   Shell: portfolio-term v1.0
  |_| |_||___|  Theme: ${theme}
                Resolution: ${typeof window !== 'undefined' ? `${window.innerWidth}×${window.innerHeight}` : 'N/A'}
                Terminal: Interactive CLI
                CPU: Full Stack Developer
                Memory: 1285+ LC Problems
                GPU: CF Expert (1718)
                Uptime: Since 2004`
          )
          break

        case 'history':
          addOutput(
            cmdHistory.length
              ? cmdHistory.map((h, i) => `  ${i + 1}  ${h}`).join('\n')
              : '  (empty)'
          )
          break

        case 'sudo':
          addOutput(
            '[sudo] password for harsh: \nNice try! 🔒 You don\'t have permission here.'
          )
          break

        case 'rm':
          addOutput(
            "rm: cannot remove '/': Permission denied\nNice try! My portfolio is indestructible. 💪"
          )
          break

        case 'exit':
          addOutput(
            "You can't leave that easily! 😄\nTry 'cd <section>' to navigate around."
          )
          break

        case 'man':
          addOutput("What manual page do you want?\nTry 'help' for available commands.")
          break

        default:
          addOutput(
            `command not found: ${cmd}\nType 'help' for available commands.`
          )
      }

      setCmdHistory((prev) => [...prev, trimmed])
      setHistIdx(-1)
    },
    [addOutput, cmdHistory, theme, toggleTheme]
  )

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      processCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (cmdHistory.length === 0) return
      const newIdx =
        histIdx === -1 ? cmdHistory.length - 1 : Math.max(0, histIdx - 1)
      setHistIdx(newIdx)
      setInput(cmdHistory[newIdx])
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (histIdx === -1) return
      const newIdx = histIdx + 1
      if (newIdx >= cmdHistory.length) {
        setHistIdx(-1)
        setInput('')
      } else {
        setHistIdx(newIdx)
        setInput(cmdHistory[newIdx])
      }
    } else if (e.key === 'Tab') {
      e.preventDefault()
      // Simple tab-completion for top-level commands
      const cmds = [
        'help','about','whoami','skills','projects','experience','contact',
        'social','resume','clear','echo','date','pwd','ls','cat','cd',
        'open','theme','neofetch','history',
      ]
      const match = cmds.filter((c) => c.startsWith(input.toLowerCase()))
      if (match.length === 1) setInput(match[0])
      else if (match.length > 1) addOutput(match.join('  '))
    }
  }

  return (
    <div
      className={`rounded-2xl overflow-hidden flex flex-col ${className}`}
      style={{
        border: '1px solid var(--border)',
        background: 'var(--bg-card)',
        minHeight: '360px',
        maxHeight: '480px',
      }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div
        className="flex items-center gap-2 px-4 py-2.5 shrink-0"
        style={{ borderBottom: '1px solid var(--border)' }}
      >
        <div className="flex gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#ff5f57' }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#febc2e' }}
          />
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ background: '#28c840' }}
          />
        </div>
        <span
          className="text-[10px] font-mono ml-2 uppercase tracking-widest"
          style={{ color: 'var(--text-muted)' }}
        >
          harsh@portfolio:~
        </span>
      </div>

      {/* Terminal body */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 py-3 font-mono text-xs leading-relaxed"
        style={{ color: 'var(--text-secondary)' }}
      >
        {lines.map((line) => (
          <div key={line.id} className="mb-1">
            {line.type === 'input' ? (
              <div className="flex gap-2">
                <span style={{ color: 'var(--accent-green)' }}>
                  harsh@portfolio:~$
                </span>
                <span style={{ color: 'var(--text-primary)' }}>
                  {line.content}
                </span>
              </div>
            ) : (
              <pre
                className="whitespace-pre-wrap break-words"
                style={{ fontFamily: 'inherit' }}
              >
                {line.content}
              </pre>
            )}
          </div>
        ))}

        {/* Active prompt */}
        <div className="flex gap-2 items-center">
          <span
            className="shrink-0"
            style={{ color: 'var(--accent-green)' }}
          >
            harsh@portfolio:~$
          </span>
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value)
              setHistIdx(-1)
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none border-none text-xs font-mono caret-current"
            style={{ color: 'var(--text-primary)', caretColor: 'var(--text-primary)' }}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal input"
          />
        </div>
      </div>
    </div>
  )
}
