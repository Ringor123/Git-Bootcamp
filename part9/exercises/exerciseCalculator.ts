interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
}

interface ArgvValues {
  value1: number,
  value2: Array<number>
}

const parseArguments = (args: string[]): ArgvValues => {
  if (args.length < 4) throw new Error('You must provide at least a target and one day of exercises');
  
  const value1 = Number(args[2])

  if (isNaN(value1)) {
    throw new Error('Provided target were not numbers!');
  }


  const value2 = new Array<number>

  for (let i = 3; i < args.length; i++) {
    const currentArg = Number(args[i])
    if (isNaN(currentArg)) {
      throw new Error('Provided hours of exercise contain a non-number value!');
    }
    value2.push(currentArg)
  }

  
  return {
    value1,
    value2,
  }
}


const calculateExercises = (dailyHours: Array<number>, hoursTarget: number): Result => {
  const periodLength = dailyHours.length
  const trainingDays = dailyHours.filter(value => value !== 0).length
  const success = dailyHours.every(hours => hours >= hoursTarget)
  const target = hoursTarget
  const average = dailyHours.reduce((a, b) => a + b, 0) / periodLength

  let rating: number
  let ratingDescription: string

  if (average >= hoursTarget) {
    rating = 3,
    ratingDescription = "Great job, you met your daily target!"
  } else if (average >= hoursTarget * 0.75) {
    rating = 2,
    ratingDescription = "Not too bad but could be better"
  } else {
    rating = 1
    ratingDescription = "You need to work harder to reach your target."
  }
  
  const result = {
    periodLength,
    trainingDays,
    success,
    rating,
    ratingDescription,
    target,
    average
  }

  return(result)
  
}



try {
  const { value1, value2 } = parseArguments(process.argv)
  console.log(calculateExercises(value2, value1))
} catch (error: unknown) {
  let errorMessage = 'Something went wrong: '
  if (error instanceof Error) {
    errorMessage += error.message
  }
  console.log(errorMessage)
}
// console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))