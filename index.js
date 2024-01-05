import { identifyPrimeImplicants, identifyEssentialPrimeImplicants } from './logic.js'

const inputTextEl = document.getElementById('input-txt')
const piTextEl = document.getElementById('pi-txt')
const epiTextEl = document.getElementById('epi-txt')
const calcBtnEl = document.getElementById('calc-btn')


calcBtnEl.addEventListener('click', () => {
    const inputText = inputTextEl.value
    const inputArr = inputText.split(',').map(item => item.trim())
    const pis = identifyPrimeImplicants(inputArr)
    const epis = identifyEssentialPrimeImplicants(inputArr, pis)
    piTextEl.value = pis
    epiTextEl.value = epis
})