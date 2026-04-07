function findLongestPalindrome(str) {
  try {
    if (typeof str !== "string") {
      throw new TypeError("Аргумент должен быть строкой");
    }

    if (str.length === 0) {
      throw new TypeError("Переданная строка пустая");
    }

    let start = 0;
    let maxLength = 1;

    function expandFromCenter(left, right) {
      while (left >= 0 && right < str.length && str[left] === str[right]) {
        left--;
        right++;
      }

      return {
        start: left + 1,
        length: right - left - 1
      };
    }

    for (let i = 0; i < str.length; i++) {
      const oddPalindrome = expandFromCenter(i, i);
      const evenPalindrome = expandFromCenter(i, i + 1);

      const longerPalindrome =
        oddPalindrome.length > evenPalindrome.length
          ? oddPalindrome
          : evenPalindrome;

      if (longerPalindrome.length > maxLength) {
        start = longerPalindrome.start;
        maxLength = longerPalindrome.length;
      }
    }

    return str.slice(start, start + maxLength);
  } catch (error) {
    console.error("Ошибка при выполнении функции findLongestPalindrome:", error.message);
    return "";
  }
}