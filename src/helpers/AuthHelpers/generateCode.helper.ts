const generateVerificationCode = (): string => {
  const uLetters = Array.from({ length: 26 }).map((_, idx) =>
    String.fromCharCode(idx + 65)
  );
  const lLetters = Array.from({ length: 26 }).map((_, idx) =>
    String.fromCharCode(idx + 97)
  );
  const number = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"];
  const base = [[] as string[]].concat(uLetters, lLetters, number);
  let code = "";

  while (code.length < 7) {
    code += base[Math.abs(Math.round(Math.random() * (0 - 61) + 0))];
  }
  return code;
};

export { generateVerificationCode };
