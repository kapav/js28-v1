import mongoose from 'mongoose'

const Schema = mongoose.Schema

const BookinstanceSchema = new Schema({
  book: {type: Schema.Types.ObjectId, ref: 'Book', required: true}, // Ссылка на книгу
  imprint: {type: String, required: true},
  status: {type: String, required: true, enum: ['Доступен', 'Обслуживание', 'Одолжен', 'Забронирован'], default: 'Обслуживание'},
  dueBack: {type: Date, default: Date.now}
})

// Виртуальное свойство - URL экземпляра книги
BookinstanceSchema
  .virtual('url')
  .get(function() {
    return '/catalog/bookinstance/' + this._id
  })

// Экспортирование модели
export default mongoose.model('Bookinstance', BookinstanceSchema)
