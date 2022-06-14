const { UserRepository } = require('../repositories/userRepository');

class UserService {

    // TODO: Implement methods to work with user

    search(search) {
        const item = UserRepository.getOne(search);
        if(!item) {
            return null;
        }
        return item;
    }

    create(data) {
        if(this.search({email: data.email}) || this.search({phoneNumber: data.phoneNumber})) {
            throw Error('user is already registered')
        }
        const user = UserRepository.create(data);
        return user;
    }

    getAll() {
        return UserRepository.getAll();
    }

    updateUser(id, data) {
        if(this.search({id})) {
            if(data.email && this.search({email: data.email}) && this.search({email: data.email}).id !== id) {
                throw Error(`user with email: ${data.email} already exists`)
            }
            if(data.phoneNumber && this.search({phoneNumber: data.phoneNumber}) && this.search({phoneNumber: data.phoneNumber}).id !== id) {
                throw Error(`user with phoneNumber: ${data.phoneNumber} already exists`)
            }
            const updatedUser = UserRepository.update(id, data)
            return updatedUser
        } else {
            throw Error(`user with id: ${id} is missing`)
        }
    }

    deleteUser(id) {
        if(this.search({id})) { 
            UserRepository.delete(id)
        } else {
            throw Error(`user with id: ${id} is missing`)
        }
    }
}

module.exports = new UserService();