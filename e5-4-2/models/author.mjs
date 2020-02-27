import mongoose from 'mongoose'

const Schema = mongoose.Schema

const AuthorSchema = new Schema({
  firstName: {type: String, required: true, maxlength: 100},
  familyName: {type: String, required: true, maxlength: 100},
  dateOfBirth: {type: Date},
  dateOfDeath: {type: Date}
})

// Виртуальное свойство для полного имени автора
AuthorSchema
  .virtual('name')
  .get(function() {
    return this.familyName + ', ' + this.firstName
  })

// Виртуальное свойство - URL автора
AuthorSchema
  .virtual('url')
  .get(function() {
    return '/catalog/author/' + this._id
  })

// Экспортирование модели
export default mongoose.model('Author', AuthorSchema)
