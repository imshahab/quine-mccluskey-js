//Main functions

// The identifyPrimeImplicants function is used to identify the prime implicants in a boolean function.
// This function takes a list of minterms and iteratively combines them until no more combinations are possible, leaving us with the prime implicants.
export function identifyPrimeImplicants(inputTerms) {
  let currentTerms = [...inputTerms]
  const primeImplicantsList = []

  while (currentTerms.length > 1) {
    const nextRoundTerms = []
    const termsMarkedForRemoval = new Array(currentTerms.length).fill(0)

    for (let i = 0; i < currentTerms.length - 1; i++) {
      for (let j = i + 1; j < currentTerms.length; j++) {
        const combinedTerm = attemptCombination(currentTerms[i], currentTerms[j])
        if (combinedTerm) {
          nextRoundTerms.push(combinedTerm)
          termsMarkedForRemoval[i] = termsMarkedForRemoval[j] = 1
        }
      }
    }

    for (let i = 0; i < currentTerms.length; i++) {
      if (termsMarkedForRemoval[i] === 0) {
        primeImplicantsList.push(currentTerms[i])
      }
    }

    currentTerms = nextRoundTerms
  }

  primeImplicantsList.push(...currentTerms)
  return removeDuplicates(primeImplicantsList)
}


// The identifyEssentialPrimeImplicants function is used to identify the essential prime implicants in a boolean function.
// This function takes a list of prime implicants and a list of minterms, and identifies which prime implicants are essential.
export function identifyEssentialPrimeImplicants(inputTerms, primeImplicants) {
  let essentialPrimeImplicantsList = []
  for (let input of inputTerms) {
    let timesCounted = 0
    let lastPrimeImplicant = ""
    for (let primeImplicant of primeImplicants) {
      if (isCovered(input, primeImplicant)) {
        timesCounted++
        lastPrimeImplicant = primeImplicant
      }
    }
    if (timesCounted === 1) {
      essentialPrimeImplicantsList.push(lastPrimeImplicant)
    }
  }
  return essentialPrimeImplicantsList
}


//Helper functions

// This function checks if two binary terms differ by exactly one bit
// If they do, it combines them into a new term where the differing bit is replaced with a "-"
// If they don't, it returns an empty string
function attemptCombination(term1, term2) {
  let combinedTerm = ""
  let differingBitsCount = 0

  for (let i = 0; i < term1.length; i++) {
    if (term1[i] === term2[i]) {
      combinedTerm += term1[i]
    } else {
      combinedTerm += "-"
      differingBitsCount++
    }
  }

  return differingBitsCount === 1 ? combinedTerm : ""
}


// This function removes duplicate items from an array
// It does this by filtering the array and only keeping items where the first occurrence of the item is at the current index
function removeDuplicates(arr) { 
  return arr.filter((item, index) => arr.indexOf(item) === index)
} 


// This function checks if one binary term covers another
// It does this by comparing each bit of the two terms
// If a bit is different and neither bit is a "-", it returns false
// If all bits are the same or a "-", it returns true
function isCovered(input1, input2) {
  for (let i = 0; i < input1.length; i++) {
    if (input1[i] !== input2[i]) {
      if (input1[i] === "-" || input2[i] === "-") {
        continue
      }
      else {
        return false
      }
    }
  }
  return true
}
