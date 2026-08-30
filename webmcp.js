/**
 * webmcp.js — WebMCP tool registrations for sangeet01.github.io
 *
 * Registers 5 tools that let any WebMCP-aware agent (ChatGPT in-app browser,
 * Chrome with chrome://flags/#enable-webmcp-testing, etc.) discover and reason
 * over the research projects on this portfolio.
 *
 * The differentiating tool is `draft_research_statement` — it writes a draft
 * directly into a live, editable region of the page (#agent-studio-output).
 * This is the move server-side MCP cannot make: the agent and the human
 * share the same surface, and edits flow both ways.
 *
 * Spec: https://webmachinelearning.github.io/webmcp/
 * Challenge: https://webmcp.devpost.com/
 */

(() => {
  'use strict';

  // ─── Project data ────────────────────────────────────────────────────────
  // Single source of truth. Tools read from this; the static HTML above is
  // the human-facing mirror. If you add a project to the page, add it here too.

  const PROJECTS = [
    {
      name: 'Numen',
      slug: 'numen',
      tagline: 'First dense retrieval model to beat BM25 on the LIMIT benchmark',
      tag: 'Information Retrieval · arXiv 2601.15205',
      year: 2026,
      themes: ['Information Retrieval', 'Dense Retrieval'],
      techniques: ['Character N-Gram Hashing', 'CRC32 Hashing', 'Training-Free', 'Vocabulary-Free'],
      license: 'Apache 2.0',
      repository: 'https://github.com/sangeet01/limitnumen',
      paper: 'https://arxiv.org/abs/2601.15205',
      summary:
        'Dense retrieval models have a hard theoretical ceiling where their embedding dimension limits how many document combinations they can represent. DeepMind\'s 2025 LIMIT benchmark proved this formally — state-of-the-art 7B parameter models like GritLM and E5-Mistral scored below 13% Recall@100.',
      approach:
        'Numen bypasses the dimension ceiling using Character N-Gram Hashing: a training-free, vocabulary-free approach that maps text into vector spaces of arbitrary size using deterministic CRC32 hashing of 3, 4, and 5-grams. No pretraining, no fine-tuning — scale the dimension to 32768 and it simply works.',
      key_results: [
        { metric: 'Recall@100 on LIMIT', value: '93.90%', context: '#1, first dense model to beat BM25' },
        { metric: 'Training examples', value: '0', context: 'Training-free' },
        { metric: 'Dimension ceiling', value: 'None', context: 'Scalable to any dimension' },
      ],
      benchmark: {
        name: 'LIMIT',
        rows: [
          { model: 'Numen', type: 'Dense', dim: 32768, recall: '93.90% (winner)' },
          { model: 'BM25', type: 'Sparse', dim: '~50k', recall: '93.6%' },
          { model: 'GritLM 7B', type: 'Dense', dim: 4096, recall: '12.9%' },
          { model: 'E5-Mistral 7B', type: 'Dense', dim: 4096, recall: '8.3%' },
        ],
      },
    },
    {
      name: 'SCRIPT',
      slug: 'script',
      full_name: 'Structural Chemical Representation In Plain Text',
      tagline: 'Sovereign molecular notation governed by a formal Paninian grammar',
      tag: 'Cheminformatics · Linguistic Notation',
      year: 2026,
      themes: ['Computational Chemistry'],
      techniques: ['Formal Language Grammar', 'Paninian Grammar Model', 'Sovereign Parsing Engine', 'RDKit-independent'],
      license: 'MIT',
      repository: 'https://github.com/sangeet01/script',
      summary:
        'Structural Chemical Representation In Plain Text (SCRIPT) is a deterministic, sovereign molecular notation system governed by a formal language grammar and a high-performance parsing engine.',
      approach:
        'Inspired by the algebraic recursion of Paninian grammar, SCRIPT derives the entire complexity of chemical space from a minimal set of generative axioms, replacing the non-deterministic heuristics of SMILES with a mathematically rigorous engine that ensures absolute state consistency and 100% round-trip fidelity. It spans from methane to materials science scaffolds, from crystallography to quantum spin states.',
      key_results: [
        { metric: 'Round-trip fidelity', value: '100%', context: 'Mathematically guaranteed' },
        { metric: 'Scale', value: 'Quantum → Macro', context: 'Unified representation' },
        { metric: 'External dependencies', value: '0', context: 'RDKit-independent sovereign engine' },
      ],
    },
    {
      name: 'Keybox',
      slug: 'keybox',
      tagline: 'In silico drug-excipient compatibility screening via 11-channel field theory',
      tag: 'Computational Pharmaceutics · Physics Simulation',
      year: 2026,
      themes: ['Computational Chemistry', 'Field Theory'],
      techniques: ['11-Channel Field Theory', 'Negative Space Matrix Multiplication', 'Nibble Engine', 'C-Native', 'Voxel Simulation'],
      license: 'MIT',
      repository: 'https://github.com/sangeet01/keybox',
      summary:
        'In drug formulation, determining whether an active pharmaceutical ingredient (API) is chemically compatible with its excipients typically requires months of stability testing and expensive lab work. Incompatibilities discovered late cost millions and can kill drug candidates.',
      approach:
        'Keybox approaches this entirely in silico using a physics-based voxel platform grounded in 11-channel field theory and first-principles mechanics. Each voxel encodes the local chemical environment across physical channels like electrostatics, van der Waals, and hydrogen bonding. The Nibble Engine — a custom 64-bit C-core — replaces traditional O(N³) molecular docking with Negative Space Matrix Multiplication, reducing physical simulation to an O(1) field projection.',
      key_results: [
        { metric: 'Physical channels per voxel', value: '11', context: 'Electrostatics, vdW, H-bond, etc.' },
        { metric: 'Binding affinity complexity', value: 'O(1)', context: 'Replaces O(N³) docking' },
        { metric: 'Coarse / Sniper latency', value: '1ms / 30ms', context: 'Per binding evaluation' },
        { metric: 'Lab experiments needed', value: '0', context: 'Pre-screening only' },
      ],
    },
    {
      name: 'Khukuri',
      slug: 'khukuri',
      tagline: 'Counter-evolutionary antibiotic discovery as a minimax game',
      tag: 'Counter-Evolution Engine · Minimax Game Theory · PINCER',
      year: 2026,
      themes: ['Computational Chemistry', 'Biology-Inspired Algorithms'],
      techniques: ['Minimax Game Theory', 'Darwin-Gödel Loop', 'PINCER Engine', 'Nibble Engine', 'Genomic Mutation Prediction'],
      license: 'MIT',
      repository: 'https://github.com/sangeet01/khukuri',
      summary:
        'Antimicrobial Resistance (AMR) is an evolutionary arms race. Khukuri changes drug discovery by moving from searching for a single fixed molecule to managing a constant duel against evolving pathogens. It treats the interaction as a zero-sum minimax game between the Blue Team (the drug) and the Red Team (the pathogen\'s predicted mutations).',
      approach:
        'The goal is to find the "Skeleton Key" — a candidate that keeps strong binding power across all possible mutations of a target receptor. Powered by the Darwin-Gödel loop, Khukuri automates the entire discovery pipeline: target identification, genomic mutation prediction, and ultra-fast O(1) docking via the Nibble engine. It is a virtual lab designed to build "future-proof" antibiotics by anticipating and neutralizing the pathogen\'s next move before it occurs.',
      key_results: [
        { metric: 'Discovery logic', value: 'Minimax zero-sum', context: 'Drug vs. pathogen mutations' },
        { metric: 'Docking speed', value: 'O(1)', context: 'Integrated Nibble Engine' },
        { metric: 'Mutation resistance', value: 'Future-proof', context: 'Predicted before occurrence' },
        { metric: 'Autonomy', value: 'Darwin-Gödel Loop', context: 'Closed-cycle discovery' },
      ],
    },
    {
      name: 'Gradient Hashing',
      slug: 'gradient-hashing',
      tagline: 'Biology-inspired load balancing that breaks a 28-year impossible triangle',
      tag: 'Distributed Systems · Biology-Inspired Algorithms',
      year: 2026,
      themes: ['Distributed Systems', 'Biology-Inspired Algorithms'],
      techniques: ['Potential Field Equation', 'Mycelial Nutrient Routing', 'Byzantine Fault Tolerance', 'CDN'],
      license: 'MIT',
      repository: 'https://github.com/sangeet01/gradient',
      summary:
        'Since 1997, distributed load balancing has been trapped by an impossible triangle: fast O(1) lookups (Maglev), low rehash churn (Ring Hashing), or spatial locality (Geo-Hashing) — never all three. Gradient Hashing breaks this constraint by replacing static permutation math with a physics-based potential field equation modeled after how mycelial fungi route nutrients.',
      approach:
        'Inspired by the 2010 experiment where slime mould independently recreated Tokyo\'s rail network by minimizing energy flow, Gradient Hashing applies the same principle to server clusters. Each routing decision is governed by gravity (distance pulls traffic to nearby nodes), pressure (load pushes traffic away from saturated nodes), and trust (a multiplicative filter that instantly isolates Byzantine nodes). Traffic flows to the optimal server and naturally spills to physical neighbors under load.',
      key_results: [
        { metric: 'Throughput', value: '1.10M req/s', context: 'vs. 0.43M for Maglev' },
        { metric: 'Avg. distance', value: '0.041', context: '90% reduction vs. Maglev' },
        { metric: 'Byzantine resilience', value: '100% immune', context: 'vs. 94.8% failure' },
        { metric: 'Constraint broken', value: '28-year', context: 'Impossible triangle resolved' },
      ],
    },
    {
      name: 'Matryoshka Protocol',
      slug: 'matryoshka-protocol',
      tagline: 'First messaging system to achieve Shannon\'s three pillars simultaneously',
      tag: 'Cryptography · Secure Messaging · PyPI',
      year: 2026,
      themes: ['Cryptography'],
      techniques: ['Fractal Group Ratchet', 'Schnorr ZK Proofs', 'Kyber-1024 + Dilithium', 'P2P', 'Steganography'],
      license: 'MIT',
      repository: 'https://github.com/sangeet01/matp',
      package: 'https://pypi.org/project/matp/',
      summary:
        'Shannon\'s three pillars of cryptography — secrecy, authentication, and steganography — have never been achieved simultaneously in a single messaging system. Matryoshka Protocol is the first to claim all three. Messages are hidden inside ordinary web traffic (JSON API responses, HTTP headers, EXIF metadata) with a mathematically proven detection probability approaching zero.',
      approach:
        'At its core is a novel Fractal Group Ratchet: a group encryption algorithm with O(1) decryption complexity regardless of group size. Combined with Schnorr-based zero-knowledge proofs for self-healing session recovery, post-quantum Kyber-1024 + Dilithium hybrid cryptography, and a fully serverless P2P architecture with k-anonymity peer discovery. Ships as a Python library on PyPI and a Rust implementation for performance.',
      key_results: [
        { metric: 'Group decrypt complexity', value: 'O(1)', context: 'Any group size' },
        { metric: 'Detection probability', value: 'ε→0', context: 'Mathematically proven' },
        { metric: 'Message speed (Rust)', value: '~25ms', context: 'Per message' },
        { metric: 'Self-heal messages', value: '3', context: 'Session recovery' },
      ],
    },
  ];

  // ─── Agent Studio DOM helpers ───────────────────────────────────────────
  // These functions write into the #agent-studio-output region on the page.
  // This is the WebMCP "live surface" — what makes this different from
  // server-side MCP.

  const STUDIO_STORAGE_KEY = 'sangeet_webmcp_studio_drafts_v1';

  function getStudioOutput() {
    return document.getElementById('agent-studio-output');
  }

  function clearStudioEmptyState() {
    const out = getStudioOutput();
    if (!out) return;
    const empty = out.querySelector('.studio-empty');
    if (empty) empty.remove();
  }

  function fmtTimestamp(ts) {
    const d = new Date(ts);
    return d.toLocaleString(undefined, {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }

  function escapeHtml(s) {
    return String(s)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  function renderMarkdownish(text) {
    // Tiny markdown subset: **bold**, *italic*, `code`, ## headings, - lists, paragraphs.
    // We escape first, then re-apply a few inline markers.
    let html = escapeHtml(text);

    // Headings
    html = html.replace(/^##\s+(.*)$/gm, '<h4 class="draft-h">$1</h4>');
    html = html.replace(/^#\s+(.*)$/gm, '<h3 class="draft-h">$1</h3>');

    // Bold and italic
    html = html.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/(^|[^*])\*([^*]+)\*/g, '$1<em>$2</em>');

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Lists
    html = html.replace(/(?:^|\n)-\s+(.*)/g, (m, line) => `\n<li>${line}</li>`);
    html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
    html = html.replace(/<\/li>\n<li>/g, '</li><li>');
    html = html.replace(/<\/ul>\n<ul>/g, '');

    // Paragraphs (split on blank lines)
    html = html
      .split(/\n{2,}/)
      .map((block) => {
        const trimmed = block.trim();
        if (!trimmed) return '';
        if (/^<(h\d|ul|ol)/.test(trimmed)) return trimmed;
        return `<p>${trimmed.replace(/\n/g, '<br>')}</p>`;
      })
      .join('');

    return html;
  }

  function createDraftCard(draft) {
    const card = document.createElement('article');
    card.className = 'studio-draft reveal visible';
    card.dataset.timestamp = draft.timestamp;
    card.dataset.kind = draft.kind || 'draft';

    const meta = [
      fmtTimestamp(draft.timestamp),
      draft.audience ? `Audience: ${escapeHtml(draft.audience)}` : null,
      draft.focus ? `Focus: ${escapeHtml(draft.focus)}` : null,
      draft.kind === 'comparison' && draft.subjects
        ? `Comparing: ${escapeHtml(draft.subjects)}`
        : null,
    ]
      .filter(Boolean)
      .join(' · ');

    card.innerHTML = `
      <div class="draft-meta">${meta}</div>
      <div class="draft-body" contenteditable="true" spellcheck="false">${renderMarkdownish(
        draft.text
      )}</div>
      <div class="draft-actions">
        <button class="draft-btn draft-copy">Copy</button>
        <button class="draft-btn draft-replace">Regenerate</button>
        <button class="draft-btn draft-dismiss">Dismiss</button>
      </div>
    `;

    // Wire actions
    card.querySelector('.draft-copy').addEventListener('click', () => {
      const text = card.querySelector('.draft-body').innerText;
      navigator.clipboard?.writeText(text).then(() => {
        const btn = card.querySelector('.draft-copy');
        const orig = btn.textContent;
        btn.textContent = 'Copied';
        setTimeout(() => (btn.textContent = orig), 1200);
      });
    });

    card.querySelector('.draft-dismiss').addEventListener('click', () => {
      card.remove();
      persistDrafts();
      if (!getStudioOutput().querySelector('.studio-draft')) {
        showStudioEmpty();
      }
    });

    card.querySelector('.draft-replace').addEventListener('click', () => {
      // Hint for the agent: drop a marker into localStorage the next tool call can read.
      // (Agents don't observe this directly; this is a UX affordance only.)
      const btn = card.querySelector('.draft-replace');
      const orig = btn.textContent;
      btn.textContent = 'Ask agent to regenerate';
      setTimeout(() => (btn.textContent = orig), 2000);
    });

    card.querySelector('.draft-body').addEventListener('input', persistDrafts);

    return card;
  }

  function ensureStudioVisible() {
    const sec = document.getElementById('studio');
    if (sec) {
      sec.style.display = 'block';
    }
  }

  function appendDraft(draft) {
    ensureStudioVisible();
    const out = getStudioOutput();
    if (!out) return null;
    clearStudioEmptyState();
    const card = createDraftCard(draft);
    out.appendChild(card);
    persistDrafts();
    // Scroll to the new draft
    card.scrollIntoView({ behavior: 'smooth', block: 'center' });
    return card;
  }

  function showStudioEmpty() {
    const out = getStudioOutput();
    if (!out) return;
    if (out.querySelector('.studio-draft')) return;
    const empty = document.createElement('div');
    empty.className = 'studio-empty';
    empty.innerHTML = `
      <div class="studio-empty-icon">◇</div>
      <p class="studio-empty-title">This surface is empty.</p>
      <p class="studio-empty-hint">
        Open this page in ChatGPT's in-app browser, or in Chrome with
        <code>chrome://flags/#enable-webmcp-testing</code> enabled, and ask
        your agent to draft a research statement, compare projects, or
        explain one of them in depth. Whatever it produces will appear here —
        and you can edit it live.
      </p>
    `;
    out.appendChild(empty);
  }

  function persistDrafts() {
    const out = getStudioOutput();
    if (!out) return;
    const cards = out.querySelectorAll('.studio-draft');
    const drafts = [];
    cards.forEach((card) => {
      const body = card.querySelector('.draft-body');
      drafts.push({
        timestamp: Number(card.dataset.timestamp),
        kind: card.dataset.kind,
        audience: card.dataset.audience || null,
        focus: card.dataset.focus || null,
        subjects: card.dataset.subjects || null,
        text: body.innerText,
      });
    });
    try {
      localStorage.setItem(STUDIO_STORAGE_KEY, JSON.stringify(drafts));
    } catch (e) {
      // Storage full or unavailable — non-fatal.
    }
  }

  function loadPersistedDrafts() {
    try {
      const raw = localStorage.getItem(STUDIO_STORAGE_KEY);
      if (!raw) return;
      const drafts = JSON.parse(raw);
      if (!Array.isArray(drafts)) return;
      if (drafts.length > 0) ensureStudioVisible();
      drafts.forEach((d) => {
        if (d && typeof d.text === 'string') {
          const card = createDraftCard(d);
          getStudioOutput().appendChild(card);
        }
      });
    } catch (e) {
      // Ignore corrupt storage.
    }
  }

  // ─── Tool implementations ───────────────────────────────────────────────

  /**
   * Tool 1: list_projects
   * Returns a compact catalog of all projects. Use this first to discover
   * what's on the portfolio before calling more specific tools.
   */
  async function listProjects(input, { signal }) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    return PROJECTS.map((p) => ({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      themes: p.themes,
      year: p.year,
      repository: p.repository,
    }));
  }

  /**
   * Tool 2: get_project
   * Returns full detail for a single project, including approach, key results,
   * and benchmark data if available. Use this when the agent needs to reason
   * deeply about one project — for explanations, deep-dives, or to extract
   * material for a draft.
   */
  async function getProject(input, { signal }) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const slug = (input?.slug || '').toLowerCase();
    const name = (input?.name || '').toLowerCase();
    const p = PROJECTS.find(
      (x) => x.slug === slug || x.name.toLowerCase() === name
    );
    if (!p) {
      return {
        error: 'not_found',
        message: `No project matching slug="${slug}" or name="${name}". Call list_projects first to see valid options.`,
        available: PROJECTS.map((x) => ({ slug: x.slug, name: x.name })),
      };
    }
    return p;
  }

  /**
   * Tool 3: find_projects_by_theme
   * Filters projects by research theme, technique, or free-text query.
   * Themes include: Information Retrieval, Dense Retrieval, Computational Chemistry,
   * Field Theory, Distributed Systems, Biology-Inspired Algorithms, Cryptography.
   */
  async function findProjectsByTheme(input, { signal }) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const theme = (input?.theme || '').toLowerCase().trim();
    const technique = (input?.technique || '').toLowerCase().trim();
    const query = (input?.query || '').toLowerCase().trim();

    if (!theme && !technique && !query) {
      return {
        error: 'bad_request',
        message: 'Provide at least one of: theme, technique, query.',
        available_themes: [
          ...new Set(PROJECTS.flatMap((p) => p.themes)),
        ],
      };
    }

    const matches = PROJECTS.filter((p) => {
      const themeHit =
        theme && p.themes.some((t) => t.toLowerCase().includes(theme));
      const techHit =
        technique &&
        p.techniques.some((t) => t.toLowerCase().includes(technique));
      const queryHit =
        query &&
        (p.name.toLowerCase().includes(query) ||
          p.tagline.toLowerCase().includes(query) ||
          p.summary.toLowerCase().includes(query) ||
          p.approach.toLowerCase().includes(query) ||
          p.themes.some((t) => t.toLowerCase().includes(query)) ||
          p.techniques.some((t) => t.toLowerCase().includes(query)));
      return themeHit || techHit || queryHit;
    }).map((p) => ({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      themes: p.themes,
      why_matched: [
        theme && p.themes.some((t) => t.toLowerCase().includes(theme))
          ? `theme: ${theme}`
          : null,
        technique &&
        p.techniques.some((t) => t.toLowerCase().includes(technique))
          ? `technique: ${technique}`
          : null,
        query ? `query: ${query}` : null,
      ].filter(Boolean),
    }));

    return {
      count: matches.length,
      matches,
    };
  }

  /**
   * Tool 4: compare_projects
   * Compares 2-3 projects along a user-specified dimension (e.g., "drug
   * discovery approach", "performance benchmarks", "novelty"). Returns a
   * structured comparison AND renders a comparison card into the Agent
   * Studio section of the page.
   */
  async function compareProjects(input, { signal }) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');
    const slugs = Array.isArray(input?.slugs) ? input.slugs : [];
    const names = Array.isArray(input?.names) ? input.names : [];
    const dimension = (input?.dimension || 'general approach').trim();

    const wanted = new Set([
      ...slugs.map((s) => s.toLowerCase()),
      ...names.map((n) => n.toLowerCase()),
    ]);

    const selected = PROJECTS.filter(
      (p) =>
        wanted.has(p.slug.toLowerCase()) ||
        wanted.has(p.name.toLowerCase())
    );

    if (selected.length < 2) {
      return {
        error: 'bad_request',
        message:
          'compare_projects needs at least 2 valid projects. Pass slugs or names.',
        available: PROJECTS.map((p) => ({ slug: p.slug, name: p.name })),
      };
    }

    const comparison = selected.map((p) => ({
      name: p.name,
      slug: p.slug,
      tagline: p.tagline,
      themes: p.themes,
      techniques: p.techniques,
      approach_excerpt: p.approach.slice(0, 280) + (p.approach.length > 280 ? '…' : ''),
      key_results: p.key_results,
    }));

    // Render a comparison card into the live page
    const cmpText = selected
      .map(
        (p) =>
          `## ${p.name}\n${p.tagline}\n\n- Themes: ${p.themes.join(', ')}\n- Techniques: ${p.techniques.join(', ')}\n- Approach: ${p.approach_excerpt}\n- Key results: ${p.key_results
            .map((r) => `${r.metric}: ${r.value}`)
            .join('; ')}`
      )
      .join('\n\n---\n\n');

    const header = `# Comparison: ${selected
      .map((p) => p.name)
      .join(' vs. ')}\nDimension: ${dimension}\n`;

    appendDraft({
      timestamp: Date.now(),
      kind: 'comparison',
      subjects: selected.map((p) => p.name).join(' vs. '),
      text: header + '\n' + cmpText,
    });

    return {
      dimension,
      projects_compared: selected.map((p) => p.name),
      comparison,
    };
  }

  /**
   * Tool 5: draft_research_statement
   * THE WEBMCP MOVE. Generates a draft and writes it directly into a live,
   * editable region on the page (#agent-studio-output). The user can then
   * edit the draft in place, and the agent can be asked to refine it.
   *
   * The agent supplies the draft text — this tool does NOT call an LLM. The
   * agent itself is the LLM. This tool is the WRITE primitive that lets the
   * agent put its draft onto the human's surface.
   */
  async function draftResearchStatement(input, { signal }) {
    if (signal?.aborted) throw new DOMException('Aborted', 'AbortError');

    const text = (input?.text || '').trim();
    if (!text) {
      return {
        error: 'bad_request',
        message:
          'draft_research_statement requires a "text" field containing the draft content. You are the LLM — write the draft yourself and pass it here to render it onto the page.',
      };
    }

    const audience = (input?.audience || '').trim();
    const focus = (input?.focus || '').trim();
    const kind = (input?.kind || 'research_statement').trim();
    const replace = Boolean(input?.replace_last);

    const out = getStudioOutput();
    if (replace && out) {
      const cards = out.querySelectorAll('.studio-draft');
      if (cards.length) {
        cards[cards.length - 1].remove();
      }
    }

    const card = appendDraft({
      timestamp: Date.now(),
      kind,
      audience,
      focus,
      text,
    });

    return {
      status: 'rendered',
      message: replace
        ? 'Draft replaced in the Agent Studio on the page. The user can now edit it live.'
        : 'Draft rendered into the Agent Studio on the page. The user can now edit it live.',
      kind,
      audience,
      focus,
      character_count: text.length,
      persisted_to_localstorage: true,
    };
  }

  // ─── Registration ───────────────────────────────────────────────────────

  function registerAll() {
    if (!('modelContext' in document)) {
      console.info('[WebMCP] document.modelContext not available. Tools not registered.');
      return;
    }

    const mc = document.modelContext;

    const tools = [
      {
        name: 'list_projects',
        title: 'List all projects',
        description:
          'Returns a compact catalog of every project on this portfolio (name, slug, tagline, themes, year, repository). Call this first to discover what is here before calling more specific tools. No input required.',
        inputSchema: {
          type: 'object',
          properties: {},
          additionalProperties: false,
        },
        execute: listProjects,
      },
      {
        name: 'get_project',
        title: 'Get full project details',
        description:
          'Returns the complete record for one project: summary, approach, techniques, key results, and benchmark data. Use this when you need to reason deeply about a single project — for explanations, deep-dives, or to extract material for a draft. Pass either slug or name.',
        inputSchema: {
          type: 'object',
          properties: {
            slug: {
              type: 'string',
              description:
                'Project slug, e.g. "numen", "script", "keybox", "khukuri", "gradient-hashing", "matryoshka-protocol".',
            },
            name: {
              type: 'string',
              description: 'Project display name, e.g. "Numen", "Keybox".',
            },
          },
          additionalProperties: false,
        },
        execute: getProject,
      },
      {
        name: 'find_projects_by_theme',
        title: 'Find projects by theme, technique, or free-text',
        description:
          'Filters projects by research theme, technique, or arbitrary text query. Useful when the user asks "what do you have on chemistry?" or "show me everything related to field theory". Themes include: Information Retrieval, Dense Retrieval, Computational Chemistry, Field Theory, Distributed Systems, Biology-Inspired Algorithms, Cryptography.',
        inputSchema: {
          type: 'object',
          properties: {
            theme: {
              type: 'string',
              description: 'A research theme, e.g. "Computational Chemistry".',
            },
            technique: {
              type: 'string',
              description: 'A technique, e.g. "minimax", "field theory", "n-gram".',
            },
            query: {
              type: 'string',
              description: 'Free-text query matched against name, tagline, summary, approach, themes, and techniques.',
            },
          },
          additionalProperties: false,
        },
        execute: findProjectsByTheme,
      },
      {
        name: 'compare_projects',
        title: 'Compare 2-3 projects on a specific dimension',
        description:
          'Compares 2 or 3 projects along a user-specified dimension (e.g. "drug discovery approach", "performance benchmarks", "novelty", "mathematical rigor"). Returns a structured comparison AND renders a comparison card into the Agent Studio section on the page so the user can see it alongside the conversation.',
        inputSchema: {
          type: 'object',
          properties: {
            slugs: {
              type: 'array',
              items: { type: 'string' },
              description: 'Slugs of 2-3 projects to compare, e.g. ["keybox", "khukuri"].',
            },
            names: {
              type: 'array',
              items: { type: 'string' },
              description: 'Display names of 2-3 projects to compare, e.g. ["Keybox", "Khukuri"].',
            },
            dimension: {
              type: 'string',
              description: 'The dimension to compare along, e.g. "drug discovery approach".',
            },
          },
          required: ['dimension'],
          additionalProperties: false,
        },
        execute: compareProjects,
      },
      {
        name: 'draft_research_statement',
        title: 'Render a draft onto the page (the WebMCP move)',
        description:
          'Renders a draft (research statement, project explanation, comparison, cover letter, etc.) directly into the Agent Studio section of the page, where the user can edit it live. YOU write the draft — this tool is the WRITE primitive that puts your text onto the human\'s surface. This is what makes WebMCP different from server-side MCP: the agent and the human share the same editable surface. After calling this, tell the user the draft is on the page and they can edit it. If the user asks for a revision, call this again with replace_last=true to replace the previous draft.',
        inputSchema: {
          type: 'object',
          properties: {
            text: {
              type: 'string',
              description:
                'The full draft text. You compose this. Markdown is supported: # ## headings, **bold**, *italic*, `code`, - bullet lists, blank line for paragraph break.',
            },
            audience: {
              type: 'string',
              description: 'Target audience, e.g. "PhD application", "grant reviewer", "recruiter".',
            },
            focus: {
              type: 'string',
              description: 'The focus or angle of the draft, e.g. "computational chemistry", "interdisciplinary work".',
            },
            kind: {
              type: 'string',
              description: 'Type of draft, e.g. "research_statement", "project_explanation", "comparison", "cover_letter".',
            },
            replace_last: {
              type: 'boolean',
              description: 'If true, replace the most recent draft in the studio. Use this when refining.',
            },
          },
          required: ['text'],
          additionalProperties: false,
        },
        execute: draftResearchStatement,
      },
    ];

    // Register each tool. The WebMCP spec returns a promise per registration.
    const registrations = tools.map((tool) =>
      mc
        .registerTool(tool)
        .then(() => ({ ok: true, name: tool.name }))
        .catch((err) => ({ ok: false, name: tool.name, err: String(err) }))
    );

    Promise.all(registrations).then((results) => {
      const ok = results.filter((r) => r.ok).map((r) => r.name);
      const failed = results.filter((r) => !r.ok);
      console.info(
        `[WebMCP] Registered ${ok.length}/${tools.length} tools:`,
        ok.join(', ')
      );
      if (failed.length) {
        console.warn('[WebMCP] Some tools failed to register:', failed);
      }
    });

    // Load any persisted drafts from previous sessions
    loadPersistedDrafts();
  }

  // ─── Boot ───────────────────────────────────────────────────────────────
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', registerAll);
  } else {
    registerAll();
  }
})();
