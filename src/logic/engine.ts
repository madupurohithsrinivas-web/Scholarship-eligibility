import { ASTNode, LogicOperator, StepEvaluation, TruthTableRow } from '../types/logic';

// Standardize symbols for display
export function formatLogicSymbol(op: LogicOperator): string {
  switch (op) {
    case 'AND':
      return '∧';
    case 'OR':
      return '∨';
    case 'NOT':
      return '¬';
    case 'IMPLIES':
      return '→';
    case 'IFF':
      return '↔';
  }
}

// Convert an AST node to human-readable math string with unicode logic operators
export function astToString(node: ASTNode): string {
  switch (node.type) {
    case 'variable':
      return node.variable;
    case 'not':
      if (node.operand.type === 'variable') {
        return `¬${astToString(node.operand)}`;
      }
      return `¬(${astToString(node.operand)})`;
    case 'binary': {
      const leftStr =
        node.left.type === 'binary' ? `(${astToString(node.left)})` : astToString(node.left);
      const rightStr =
        node.right.type === 'binary' ? `(${astToString(node.right)})` : astToString(node.right);
      return `${leftStr} ${formatLogicSymbol(node.operator)} ${rightStr}`;
    }
  }
}

// Evaluate boolean truth of AST given assignment
export function evaluateAST(node: ASTNode, assignment: Record<string, boolean>): boolean {
  switch (node.type) {
    case 'variable':
      return Boolean(assignment[node.variable]);
    case 'not':
      return !evaluateAST(node.operand, assignment);
    case 'binary': {
      const l = evaluateAST(node.left, assignment);
      const r = evaluateAST(node.right, assignment);
      switch (node.operator) {
        case 'AND':
          return l && r;
        case 'OR':
          return l || r;
        case 'IMPLIES':
          // A -> B is logically equivalent to (!A || B)
          return !l || r;
        case 'IFF':
          return l === r;
        default:
          return false;
      }
    }
    default:
      return false;
  }
}

// Generate step-by-step deductions for human inspection
export function evaluateWithProofSteps(
  node: ASTNode,
  assignment: Record<string, boolean>,
  propNames: Record<string, string>
): { result: boolean; steps: StepEvaluation[] } {
  const steps: StepEvaluation[] = [];

  function helper(sub: ASTNode): { val: boolean; expr: string } {
    if (sub.type === 'variable') {
      const val = Boolean(assignment[sub.variable]);
      const pName = propNames[sub.variable] || sub.variable;
      steps.push({
        subExpression: sub.variable,
        renderedMath: `${sub.variable} = ${val ? 'True (T)' : 'False (F)'}`,
        truthValue: val,
        explanation: `Premise proposition ${sub.variable} (${pName}) is evaluated as ${val ? 'satisfied' : 'unsatisfied'}.`,
      });
      return { val, expr: sub.variable };
    }

    if (sub.type === 'not') {
      const inner = helper(sub.operand);
      const val = !inner.val;
      const expr = `¬(${inner.expr})`;
      steps.push({
        subExpression: expr,
        renderedMath: `¬(${inner.val ? 'T' : 'F'}) ≡ ${val ? 'T' : 'F'}`,
        truthValue: val,
        explanation: `Negation of (${inner.expr}) flips ${inner.val ? 'True to False' : 'False to True'}.`,
      });
      return { val, expr };
    }

    // Binary
    const l = helper(sub.left);
    const r = helper(sub.right);
    let val = false;
    let ruleName = '';

    switch (sub.operator) {
      case 'AND':
        val = l.val && r.val;
        ruleName = 'Conjunction (∧)';
        break;
      case 'OR':
        val = l.val || r.val;
        ruleName = 'Disjunction (∨)';
        break;
      case 'IMPLIES':
        val = !l.val || r.val;
        ruleName = 'Material Implication (→)';
        break;
      case 'IFF':
        val = l.val === r.val;
        ruleName = 'Biconditional Equivalence (↔)';
        break;
    }

    const opSymbol = formatLogicSymbol(sub.operator);
    const expr = `(${l.expr} ${opSymbol} ${r.expr})`;
    const boolMath = `(${l.val ? 'T' : 'F'} ${opSymbol} ${r.val ? 'T' : 'F'}) ≡ ${val ? 'True (T)' : 'False (F)'}`;

    let reason = '';
    if (sub.operator === 'AND') {
      reason = val
        ? 'Both conjuncts hold True; conjunction succeeds.'
        : `Conjunction fails because ${!l.val ? l.expr : r.expr} is False.`;
    } else if (sub.operator === 'OR') {
      reason = val
        ? `Disjunction holds because at least one disjunct (${l.val ? l.expr : r.expr}) is True.`
        : 'Disjunction fails because neither condition is satisfied.';
    } else if (sub.operator === 'IMPLIES') {
      reason = val
        ? 'Implication premise holds or antecedent is false, condition satisfied.'
        : 'Antecedent was true but consequent failed.';
    } else {
      reason = val ? 'Equivalence holds.' : 'Equivalence does not match.';
    }

    steps.push({
      subExpression: expr,
      renderedMath: `${ruleName}: ${boolMath}`,
      truthValue: val,
      explanation: reason,
    });

    return { val, expr };
  }

  const finalResult = helper(node);
  return { result: finalResult.val, steps };
}

// Generate complete truth table for given relevant variables
export function generateTruthTable(
  ast: ASTNode,
  variables: string[],
  currentAssignment: Record<string, boolean>
): TruthTableRow[] {
  const n = variables.length;
  const totalRows = Math.pow(2, n);
  const rows: TruthTableRow[] = [];

  for (let i = 0; i < totalRows; i++) {
    const rowAssignment: Record<string, boolean> = {};
    let isCurrent = true;

    for (let j = 0; j < n; j++) {
      // MSB first
      const bit = Boolean((i >> (n - 1 - j)) & 1);
      const varName = variables[j];
      rowAssignment[varName] = bit;
      if (Boolean(currentAssignment[varName]) !== bit) {
        isCurrent = false;
      }
    }

    const result = evaluateAST(ast, rowAssignment);
    rows.push({
      rowId: i + 1,
      assignment: rowAssignment,
      isCurrentProfile: isCurrent,
      result,
    });
  }

  return rows;
}

// Gap Analysis: find which single or minimal proposition changes make formula True
export function findSatisfyingFixes(
  ast: ASTNode,
  relevantVars: string[],
  currentAssignment: Record<string, boolean>,
  propDetails: Record<string, { name: string; remedy: string }>
): { id: string; name: string; remedy: string }[] {
  // If already true, no fixes needed
  if (evaluateAST(ast, currentAssignment)) {
    return [];
  }

  const candidates: { id: string; name: string; remedy: string }[] = [];

  // Check 1-step flips (changing one False variable to True)
  for (const v of relevantVars) {
    if (!currentAssignment[v]) {
      const trialAssignment = { ...currentAssignment, [v]: true };
      if (evaluateAST(ast, trialAssignment)) {
        candidates.push({
          id: v,
          name: propDetails[v]?.name || v,
          remedy: propDetails[v]?.remedy || `Satisfy ${v}`,
        });
      }
    }
  }

  // If no single flip solved it (e.g. requires both P and Q), list all unsatisfied relevant variables
  if (candidates.length === 0) {
    for (const v of relevantVars) {
      if (!currentAssignment[v]) {
        candidates.push({
          id: v,
          name: propDetails[v]?.name || v,
          remedy: propDetails[v]?.remedy || `Meet criteria for proposition ${v}`,
        });
      }
    }
  }

  return candidates;
}

// Simple Parser for Custom Logic Expressions
// Supports: P, Q, R... operators: &, |, !, ->, <->, AND, OR, NOT
export function parseFormula(input: string): { ast: ASTNode | null; error?: string } {
  try {
    let clean = input
      .replace(/\s+/g, ' ')
      .replace(/&&/g, '&')
      .replace(/\|\|/g, '|')
      .replace(/∧/g, '&')
      .replace(/∨/g, '|')
      .replace(/¬/g, '!')
      .replace(/→/g, '->')
      .replace(/↔/g, '<->')
      .replace(/\bAND\b/gi, '&')
      .replace(/\bOR\b/gi, '|')
      .replace(/\bNOT\b/gi, '!')
      .replace(/\bIMPLIES\b/gi, '->')
      .replace(/\bIFF\b/gi, '<->')
      .trim();

    // Tokenize
    const tokens: string[] = [];
    let i = 0;
    while (i < clean.length) {
      const ch = clean[i];
      if (ch === ' ') {
        i++;
        continue;
      }
      if (ch === '<' && clean.slice(i, i + 3) === '<->') {
        tokens.push('<->');
        i += 3;
        continue;
      }
      if (ch === '-' && clean.slice(i, i + 2) === '->') {
        tokens.push('->');
        i += 2;
        continue;
      }
      if (ch === '&' || ch === '|' || ch === '!' || ch === '(' || ch === ')') {
        tokens.push(ch);
        i++;
        continue;
      }
      if (/[A-Za-z0-9_]/.test(ch)) {
        let id = '';
        while (i < clean.length && /[A-Za-z0-9_]/.test(clean[i])) {
          id += clean[i];
          i++;
        }
        tokens.push(id.toUpperCase());
        continue;
      }
      throw new Error(`Unexpected character '${ch}' in expression`);
    }

    if (tokens.length === 0) {
      return { ast: null, error: 'Expression is empty' };
    }

    let pos = 0;

    function peek() {
      return tokens[pos];
    }

    function consume(expected?: string) {
      const t = tokens[pos];
      if (expected && t !== expected) {
        throw new Error(`Expected '${expected}', got '${t}'`);
      }
      pos++;
      return t;
    }

    // Grammar:
    // expr   -> iff
    // iff    -> impl ('<->' impl)*
    // impl   -> or ('->' or)*
    // or     -> and ('|' and)*
    // and    -> not ('&' not)*
    // not    -> '!' not | primary
    // primary-> VAR | '(' expr ')'

    function parseExpr(): ASTNode {
      return parseIff();
    }

    function parseIff(): ASTNode {
      let node = parseImpl();
      while (peek() === '<->') {
        consume('<->');
        const right = parseImpl();
        node = { type: 'binary', operator: 'IFF', left: node, right };
      }
      return node;
    }

    function parseImpl(): ASTNode {
      let node = parseOr();
      while (peek() === '->') {
        consume('->');
        const right = parseOr();
        node = { type: 'binary', operator: 'IMPLIES', left: node, right };
      }
      return node;
    }

    function parseOr(): ASTNode {
      let node = parseAnd();
      while (peek() === '|') {
        consume('|');
        const right = parseAnd();
        node = { type: 'binary', operator: 'OR', left: node, right };
      }
      return node;
    }

    function parseAnd(): ASTNode {
      let node = parseNot();
      while (peek() === '&') {
        consume('&');
        const right = parseNot();
        node = { type: 'binary', operator: 'AND', left: node, right };
      }
      return node;
    }

    function parseNot(): ASTNode {
      if (peek() === '!') {
        consume('!');
        const operand = parseNot();
        return { type: 'not', operand };
      }
      return parsePrimary();
    }

    function parsePrimary(): ASTNode {
      const t = peek();
      if (!t) {
        throw new Error('Unexpected end of formula');
      }
      if (t === '(') {
        consume('(');
        const node = parseExpr();
        consume(')');
        return node;
      }
      if (/^[A-Z0-9_]+$/.test(t)) {
        consume();
        return { type: 'variable', variable: t };
      }
      throw new Error(`Unexpected token '${t}'`);
    }

    const ast = parseExpr();
    if (pos < tokens.length) {
      throw new Error(`Extra token '${tokens[pos]}' after valid expression`);
    }

    return { ast };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : String(err);
    return { ast: null, error: message };
  }
}

// Extract all unique variables in an AST
export function extractVariables(node: ASTNode): string[] {
  const vars = new Set<string>();
  function walk(n: ASTNode) {
    if (n.type === 'variable') {
      vars.add(n.variable);
    } else if (n.type === 'not') {
      walk(n.operand);
    } else if (n.type === 'binary') {
      walk(n.left);
      walk(n.right);
    }
  }
  walk(node);
  return Array.from(vars).sort();
}
