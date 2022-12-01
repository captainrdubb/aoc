function frequency(S: string, start: number, end: number) {
    let substr: string[] = [];
    let result: Array<[string, Map<string, number>]> = [];
    for (let i = start; i <= end; ++i) {
        let prev = substr[i - 1] || "";
        substr.push(prev + S[i]);
    }

    while (substr.length) {
        let sub = substr.pop() as string;
        let counts = new Map();
        for (const char of sub) {
            const count = counts.get(char) || 0;
            counts.set(char, count + 1);
        }
        result.push([sub, counts]);

        let subA = sub.substring(1);
        if (subA.length > 0) {
            substr.push(subA);
        }
    }

    return result;
}

console.log(frequency("capitalone", 0, 9));