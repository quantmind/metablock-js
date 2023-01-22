const ScriptPromises: Record<string, Promise<void>> = {};

const attachScript = (script: any) => {
  const text = script.textContent;
  if (!ScriptPromises[text]) {
    ScriptPromises[text] = new Promise((resolve, reject) => {
      script.onerror = reject;
      script.onload = () => resolve();
      document.head.appendChild(script);
    });
  }
  return ScriptPromises[text];
};

export default attachScript;
