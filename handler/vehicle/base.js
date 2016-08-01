//Base class for vehicle handlers
class Base {
    /**
     * Call the app logic for getting GM data.
     * @param {object} req - The request
     * @param {object} res - The response
	 * @param {functio} next - Continue from this middleware
     */
	gmGet (req, res, next) {
		next();
	}

    /**
     * Call the app logic for filtering GM data
     * @param {object} req - The request
     * @param {object} res - The response
	 * @param {functio} next - Continue from this middleware
     */
	filterGet (req, res, next) {
		res.send({});
	}
}

module.exports = Base;