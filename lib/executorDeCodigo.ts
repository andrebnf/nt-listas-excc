// TODO: mover função `wrapCode` para um service worker
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Using_web_workers
export const executaJavaScript = (code: string): [
  logs: string[], 
  hasError: boolean, 
  errorLine: number, 
  errorMessage: string
] => {
  const prefixFnCode = `
  let w___logs = []; 
  let w___errorLine = 0; 
  let w___errorMessage = ''; 
  function w___customLogFn(text){ w___logs.push(String(text)); } 
  
  try{
  `

  const consoleLogRenomado = code.replace(
    /console\.(log|info|debug|warn|error)/g, 
    "w___customLogFn"
  ) + "\n";

  const suffixFnCode = `
  } catch(err) { 
    w___errorMessage = err.message; 
    w___errorLine = +err.stack.split("\\n").filter(
      e => e.includes("<anonymous>") || e.includes("Function")
    )[0].replace(/.*\\:(\\d+)\\:.*/, "$1"); 
  } finally { 
    return [ 
      w___logs, 
      w___errorLine > 0, 
      w___errorLine - 9,
      w___errorMessage 
    ]; 
  }`;

  const finalCode = prefixFnCode + consoleLogRenomado + suffixFnCode;

  return new Function(finalCode)();
}
