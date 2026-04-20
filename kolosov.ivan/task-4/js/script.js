const usersJson = JSON.parse(localStorage.getItem('users') || []);
let users;
try {
    users = usersJson.map(u => {
        const user = new User(Number.parseInt(u.id), u.name);
        user.friends = u.friends || [];
        return user;
    });
}
catch (error) {
    console.error("Error reading local storage (it might be corrupted): ", error)
    localStorage.clear();
}

renderUsers();
console.log(groupUsersByFriendsAmount(users));
console.log(getAllFriends(users));
console.log(getAllUsersWhoHaveFriendWithID(users, 322));
console.log(getUsersWithMoreFriendsThan(users, 2));
console.log(getUsersWithNoFriends(users));

function renderUsers() {
    const container = document.querySelector('.users')
    container.innerHTML = '';
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.classList.add('user');
        userDiv.id = user.id;
        userDiv.innerHTML = `
            <p>User name: ${user.name}</p>
            <p>User id: ${user.id}</p>
            <p>User friends: ${user.friends}</p>
            <div>
                <input type="text" name="friendID" placeholder="ID of new friend">
                <button class="add-friend-btn">Add Friend</button>
            </div>
            <div>
                <input type="text" name="friendID" placeholder="ID of friend to delete">
                <button class="delete-friend-btn">Delete Friend</button>
            </div>
            <button class="delete-user-btn">Delete User</button>
            
        `;
        container.appendChild(userDiv);
    });
}

function addUser(userID, userName) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try{
                const newUser = new User(userID, userName);
                users = [...users, newUser];
                localStorage.setItem('users', JSON.stringify(users));
                resolve(newUser);
            }
            catch (error) {
                reject(new Error("Error occured while creating a user: " + error.message));
            }
        }, 1000);
    });
}

function deleteUser(index) {
    return new Promise((resolve) => {
        setTimeout(() => {
            users.splice(index, 1);
            localStorage.setItem('users', JSON.stringify(users));
            resolve();
        }, 1000);
    });
}

function addFriend(index, friendID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                users[index].addFriend(friendID);
                localStorage.setItem('users', JSON.stringify(users));
                resolve();
            }
            catch (error) {
                reject("Error occured while adding a new friend" + error.message);
            }
        }, 1000);
    });
}

function deleteFriend(index, friendID) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                users[index].removeFriend(friendID);
                localStorage.setItem('users', JSON.stringify(users));
                resolve();
            }
            catch(error) {
                reject("Error occured while deleting the friend: " + error.message);
            }
        }, 1000)
    });
}

document.getElementById('addUser').addEventListener('click', (event) => {
    event.target.disabled = true;
    const userID = document.getElementById('userID');
    const userName = document.getElementById('userName');
    const id = Number.parseInt(userID.value);
    const name = userName.value;
    userID.value = '';
    userName.value = '';

    if (users.findIndex(user => user.id === id) === -1) {
        addUser(id, name).then( () => {   
            renderUsers();
        }).catch(error => {
            console.error("Error adding user: ", error);
        }).finally(() => {
            event.target.disabled = false;
        });
    }
    else {
        event.target.disabled = false;
        throw new Error("User with this ID already exists");
    }
});

document.querySelector('.users').addEventListener('click', (event) => {
    const user = event.target.closest('.user');
    if (!user) return;

    const userID = Number.parseInt(user.id);
    const userIndex = users.findIndex(user => user.id === userID);

    if (event.target.matches('.delete-user-btn')) {
        event.target.disabled = true;
        deleteUser(userIndex).then(() => {
            renderUsers();
        });
    } else if(event.target.matches('.add-friend-btn') || event.target.matches('.delete-friend-btn')) {
        event.target.disabled = true;
        const input = event.target.parentElement.querySelector('input');
        input.disabled = true;
        const friendID = Number.parseInt(input.value);
        
        if(event.target.matches('.add-friend-btn')) {
            addFriend(userIndex, friendID).then(() => {
                renderUsers();
            }).catch(error => {
                console.error("Error adding friend: ", error);
                event.target.disabled = false;
                input.disabled = false;
            });
        }
        else {
            deleteFriend(userIndex, friendID).then(() => {
                renderUsers();
            }).catch(error => {
                console.error("Error deleting the friend: ", error);
                event.target.disabled = false;
                input.disabled = false;
            });
        }

        input.value = '';
    }
});