/**
 * Removes all leading zeroes from each hextet in an IPv6 address.
 * 
 * @param {string} ipv6Address an IPv6 address in the preferred format (39 characters in length)
 * @returns an array of 8 hextets with all leading zeroes removed
 */
const omitHextetLeadingZeroes = (ipv6Address: string): string[] => {

    const shortenedHextetArray = ipv6Address.split(":").map((hextet) => {

        let leadingZeroes = 0;

        while (hextet[leadingZeroes] === "0") leadingZeroes++;

        return leadingZeroes > 0 ?
            hextet.slice(leadingZeroes) || "0" : hextet;
    });

    return shortenedHextetArray;
}

/**
 * 
 * @param {string[]} hextetArr 
 * @returns 
 */
const findLongestContiguousZeroes = (hextetArr: string[]): number[] => {

    let startIndexOfLongestZeroString = -1;

    let prevWindowSize = 0;
    let windowSize = 0;
    let windowStart = 0;
    let numberOfZeroesInWindow = 0;

    for (let windowEnd = 0; windowEnd < hextetArr.length; windowEnd++) {

        prevWindowSize = windowSize;

        if (hextetArr[windowEnd] === "0") {
            numberOfZeroesInWindow++;

            if (windowSize + 1 === numberOfZeroesInWindow) {
                windowSize++;
            } else {

                if (hextetArr[windowStart] === "0") {
                    numberOfZeroesInWindow--;
                }

                windowStart++;
            }
        } else {

            if (hextetArr[windowStart] === "0") {
                numberOfZeroesInWindow--;
            }

            windowStart++;
        }

        if (hextetArr[windowStart] === "0" && windowSize === numberOfZeroesInWindow && windowSize > prevWindowSize) {
            startIndexOfLongestZeroString = windowStart;
        }
    }


    return [startIndexOfLongestZeroString, windowSize];
}

/**
 * 
 * @param {string[]} shortenedHextetArray 
 * @param {number} startIndex the start index of the longest contiguous 
 * @param {number} contiguousZeroHextetsLength 
 * @returns 
 */
const stringifyCompressedHextetArray = (
    shortenedHextetArray: string[],
    startIndex: number,
    contiguousZeroHextetsLength: number
): string => {

    let compressedIPv6Address = '';

    // if the input address has all zero-hextets
    if (contiguousZeroHextetsLength === shortenedHextetArray.length) {
        return "::";

        // if the longest contiguous string of zero-hextets starts with the first hextet
    } else if (startIndex === 0) {
        for (let i = startIndex + contiguousZeroHextetsLength; i < shortenedHextetArray.length; i++) {
            compressedIPv6Address += ":" + shortenedHextetArray[i];
        }

        return ":" + compressedIPv6Address;

        // if the longest contiguous string of zero-hextets ends with the last hextet
    } else if (startIndex + contiguousZeroHextetsLength === shortenedHextetArray.length) {
        for (let i = 0; i < startIndex; i++) {
            compressedIPv6Address += shortenedHextetArray[i] + ":";
        }

        return compressedIPv6Address + ":";

        /*
            if the longest contiguous string of zero-hextets does not start with the first hextet
            and also does not end with the last hextet
        */
    } else if (contiguousZeroHextetsLength > 0 && startIndex + contiguousZeroHextetsLength < shortenedHextetArray.length) {

        for (let i = 0; i < startIndex; i++) {
            compressedIPv6Address += shortenedHextetArray[i] + ":";
        }

        for (let i = startIndex + contiguousZeroHextetsLength; i < shortenedHextetArray.length; i++) {
            compressedIPv6Address += ":" + shortenedHextetArray[i];
        }

        return compressedIPv6Address;

        // also applies to when there is no zero-hext in the input address
    } else {
        return shortenedHextetArray.join(":");
    }
}

/**
 * Converts an IPv6 address from the preferred format to its compressed form.
 * 
 * @param {string} ipv6Address an IPv6 address in the preferred format (39 characters in length)
 * @returns a compressed IPv6 address
 */
export const compressIPv6Address = (ipv6Address: string): string => {
    const shortenedHextetArray = omitHextetLeadingZeroes(ipv6Address);
    const [startIndexOfLongestZeroHextets, contiguousZeroHextetsLength] = findLongestContiguousZeroes(shortenedHextetArray);

    return stringifyCompressedHextetArray(shortenedHextetArray, startIndexOfLongestZeroHextets, contiguousZeroHextetsLength);

}