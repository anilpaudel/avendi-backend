/**
 * Base class that is extended by domain models.
 */
class Model {
  /**
   * This method creates model for services.
   *
   * @param {object} model
   */
  constructor (model) {
    this.model = model
  }

  /**
   * This method persists the payload object to underlying database.
   *
   * @param {Object} payload
   * @returns {Promise}
   */
  save (payload = {}) {
    return this.model.create(payload)
  }

  /**
   * This method updates the document by its id and passed payload.
   *
   * @param {String} id
   * @param {Object} payload
   * @returns {Promise}
   */
  updateById (id, payload) {
    return this.model.findByIdAndUpdate({ _id: id }, payload, { new: true })
  }

  /**
   * This method deletes the document(s) by document id.
   *
   * @param {String} id
   * @returns {Promise}
   */
  deleteById (id) {
    return this.model.findByIdAndRemove({ _id: id })
  }

  /**
   * This method fetches a row from the db.
   *
   * @param {object} options
   * @returns {Promise}
   */
  fetchById (id) {
    return this.model.find({ _id: id })
  }
}

module.exports = Model
