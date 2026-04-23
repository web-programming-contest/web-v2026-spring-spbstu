function groupUsersByFriendsAmount(users) {
    let groups = new Map;
    for (let user of users) {
        if(!groups.has(user.friendsCount)) {
            groups.set(user.friendsCount, [user.id]);
        }
        else {
            groups.get(user.friendsCount).push(user.id);
        }
    }
    return groups;
}

function getAllFriends(users) {
    let allFriends = new Set();
    for (let user of users) {
        for (let friendID of user.friends) {
            allFriends.add(friendID);
        }
    }
    return Array.from(allFriends);
}

function getAllUsersWhoHaveFriendWithID(users, friendID) {
    let usersWithFriend = [];
    for (let user of users) {
        if (user.friends.indexOf(friendID) !== -1) {  
            usersWithFriend.push(user.id);
        }
    }
    return usersWithFriend;
}

function getUsersWithMoreFriendsThan(users, friendsCount) {
    let usersWithMoreFriendsThanFriendsCount = [];

    for (let user of users) {
        if (user.friendsCount > friendsCount) {
            usersWithMoreFriendsThanFriendsCount.push(user.id);
        }
    }

    return usersWithMoreFriendsThanFriendsCount;
}

function getUsersWithNoFriends(users) {
    let usersWithNoFriends = [];
    for (let user of users) {
        if (user.friendsCount === 0) {
            usersWithNoFriends.push(user.id);
        }
    }
    return usersWithNoFriends;
}