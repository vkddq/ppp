function countVowels(str) {
    const matches = str.match(/[aeiou]/gi);
    return matches ? matches.length : 0;
}
console.log(countVowels("Hello World"));

function secondLargest(arr) {
    const uniqueSorted = [...new Set(arr)].sort((a, b) => b - a);
    return uniqueSorted.length > 1 ? uniqueSorted[1] : null;
}
console.log(secondLargest([10, 40, 30, 20, 50]));

function isAnagram(str1, str2) {
    const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '').split('').sort().join('');
    return normalize(str1) === normalize(str2);
}
console.log(isAnagram("listen", "silent"));

function twoSum(arr, target) {
    const numMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        const complement = target - arr[i];
        if (numMap.has(complement)) {
            return [numMap.get(complement), i];
        }
        numMap.set(arr[i], i);
    }
    return [];
}
console.log(twoSum([2, 7, 11, 15], 9));

function isPalindrome(str) {
    const cleanStr = str.toLowerCase().replace(/[\W_]/g, '');
    const reversedStr = cleanStr.split('').reverse().join('');
    return cleanStr === reversedStr;
}
console.log(isPalindrome("racecar"));
console.log(isPalindrome("hello"));