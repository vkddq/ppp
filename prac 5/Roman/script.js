const input = document.getElementById('numberInput');
const resultText = document.getElementById('resultText');

function toRoman(num) {
    if (num < 1 || num > 3999) return "Invalid";
    
    const map = [
        { val: 1000, sym: 'M' },
        { val: 900, sym: 'CM' },
        { val: 500, sym: 'D' },
        { val: 400, sym: 'CD' },
        { val: 100, sym: 'C' },
        { val: 90, sym: 'XC' },
        { val: 50, sym: 'L' },
        { val: 40, sym: 'XL' },
        { val: 10, sym: 'X' },
        { val: 9, sym: 'IX' },
        { val: 5, sym: 'V' },
        { val: 4, sym: 'IV' },
        { val: 1, sym: 'I' }
    ];

    let res = '';
    for (const { val, sym } of map) {
        while (num >= val) {
            res += sym;
            num -= val;
        }
    }
    return res;
}

input.addEventListener('input', (e) => {
    const val = parseInt(e.target.value);
    if (!val) {
        resultText.textContent = "-";
        return;
    }
    resultText.textContent = toRoman(val);
});