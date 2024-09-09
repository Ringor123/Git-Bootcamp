interface BmiValues {
  valueAlt: number,
  valueKilo: number
}

const parseArguments = (args: Array<string>): BmiValues => {
  if (args.length !== 4) throw new Error('Please, introduce the correct arguments')

  const valueAlt = Number(args[2])
  const valueKilo = Number(args[3])

  if (isNaN(valueAlt) || isNaN(valueKilo)) {
    throw new Error ('Provided values were not numbers!')
  }
  
  return {
    valueAlt,
    valueKilo
  }
}

const calculateBmi = (alt: number, kilo: number): string => {
  const metro = alt/100

  const result = kilo / metro ** 2

  if (result < 16) {
    return "Underweight (Severe thinness)"
  } else if (result >= 16 && result <= 16.9) {
    return "Underweight (Moderate thinness)"
  } else if (result >= 17 && result <= 18.4) {
    return "Underweight (Mild thinness)"
  } else if (result >= 18.5 && result <= 24.9) {
    return "Normal range"
  } else if (result >= 25 && result <= 29.9) {
    return "Overweight (Pre-obese)"
  } else if (result >= 30 && result <= 34.9) {
    return "Obese (Class I)"
  } else if (result >= 35 && result <= 39.9) {
    return "Obese (Class II)"
  } else if (result >= 40) {
    return "Obese (Class III)"
  }
}

try {
  const { valueAlt, valueKilo } = parseArguments(process.argv)
  console.log(calculateBmi(valueAlt, valueKilo))
} catch (error: unknown) {
  let ErrorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    ErrorMessage += 'Error ' + error.message
  }
  console.log(ErrorMessage)
}