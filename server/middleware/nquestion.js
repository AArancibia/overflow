 const question = {
  _id: 1,
  title: '¿Como reutilizo un componente en Android?',
  description: 'Miren esta es mi pregunta',
  createdAt: new Date(),
  icon: 'devicon-android-plain',
  answers: [],
  user: {
    firstName: 'Alexis',
    lastName: 'Arancibia Sanchez',
    email: 'alexis2396@hotmail.com',
    password: '123456'
  }
}

export const questions = new Array(10).fill(question)

export const questionsMiddleware = (req, res , next) => {
  req.questions = questions
  next()
}

export const questionMiddleware = (req, res , next) => {
  const { id } = req.params
  req.question = questions.find(({ _id }) => _id === +id) //mas para transformar a numero
  next()
}
