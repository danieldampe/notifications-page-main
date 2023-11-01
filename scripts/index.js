// *** *** *** Variables *** *** ***
const d = document,
    c = console;
// *** Constantes ***
const IMG_PATH = "./assets/images/";
const rtf1 = new Intl.RelativeTimeFormat('en', { style: 'long' });
// *** DOM ***
const $main = d.getElementById("main"),
    $notification = d.getElementById("notification").content,
    $number = d.getElementById("number-notifications"),
    $button = d.getElementById("mark-all-btn"),
    $fragment = d.createDocumentFragment();
// *** Notificaciones ***
const notifications = [
    {
        user: "Mark Webber",
        action: "reacted to your recent post",
        complement: "My first tournament today!",
        time: ["1", "month"],
        read: false,
        userImage: IMG_PATH + "avatar-mark-webber.webp"
    },
    {
        user: "Rizky Hasanuddin",
        action: "sent you a private message",
        time: ["5", "day"],
        message: "Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.",
        userImage: IMG_PATH + "avatar-rizky-hasanuddin.webp"
    },
    {
        user: "Kimberly Smith",
        action: "commented on your picture",
        time: ["1", "week"],
        userImage: IMG_PATH + "avatar-kimberly-smith.webp",
        postImage: IMG_PATH + "image-chess.webp"
    },
    {
        user: "Angela Gray",
        action: "followed you",
        time: ["5", "month"],
        read: false,
        userImage: IMG_PATH + "avatar-angela-gray.webp"
    },
    {
        user: "Jacob Thompson",
        action: "has joined your group",
        complement: "Chess Club",
        time: ["1", "day"],
        read: false,
        userImage: IMG_PATH + "avatar-jacob-thompson.webp"
    },
    {
        user: "Nathan Peterson",
        action: "reacted to your recent post",
        complement: "5 end-game strategies to increase your win rate",
        time: ["2", "week"],
        userImage: IMG_PATH + "avatar-nathan-peterson.webp"
    },
    {
        user: "Anna Kim",
        action: "left the group",
        complement: "Chess Club",
        time: ["2", "week"],
        userImage: IMG_PATH + "avatar-anna-kim.webp"
    }
];

// Verificaciones
notifications.forEach(noti => (noti.read !== false) && (noti.read = true));

// Notificaciones Leidas y No Leidas
const unreadNotifications = notifications.filter(noti => noti.read === false),
    readNotifications = notifications.filter(noti => noti.read === true);

// *** *** *** Funciones *** *** ***
const addClass = (element, className) => element.classList.add(className);
const removeClass = (element, className) => element.classList.remove(className);
const toggleClass = (element, className) => element.classList.toggle(className);
const addStateClass = (element, className) => element.classList.add(element.classList[0] + "--" + className);
const removeStateClass = (element, className) => element.classList.remove(element.classList[0] + "--" + className);
const toggleStateClass = (element, className) => element.classList.toggle(element.classList[0] + "--" + className);
const clickBtn = (element, evt) => evt.target === element || evt.target.matches("#" + element.id + " *");

const createNotification = obj => {
    // *** Variables ***
    let $clone = d.importNode($notification, true);
    // Parametro
    let {user, action, complement, time, read, userImage, postImage, message} = obj;
    // Template
    let $container = $clone.querySelector(".notification"),
        $user = $clone.querySelector(".notification-txt-p__user"),
        $action = $clone.querySelector(".notification-txt-p__action"),
        $complement = $clone.querySelector(".notification-txt-p__complement"),
        $indicator = $clone.querySelector(".notification-txt-p__indicator"),
        $time = $clone.querySelector(".notification-txt__time"),
        $message = $clone.querySelector(".notification-txt__message"),
        $userImage = $clone.querySelector(".notification__user-img"),
        $postImage = $clone.querySelector(".notification__post-img");
    // *** Ejecución ***
    $user.textContent = user;
    $action.textContent = action;
    $time.textContent = rtf1.format("-" + time[0], time[1]);
    $userImage.src = userImage;
    complement 
        ? $complement.textContent = complement 
        : addClass($complement, "none"); 
    postImage 
        ? $postImage.src = postImage 
        : addClass($postImage, "none");
    message
        ? $message.textContent = message
        : addClass($message, "none");
    if(!read) {
        removeClass($indicator, "none");
        addStateClass($container, "unread");
    };

    return $clone;
};

// *** *** *** Ejecución *** *** ***
d.addEventListener("DOMContentLoaded", evt => {
    for (let i = 0; i < unreadNotifications.length; i++) {
        $fragment.append(createNotification(unreadNotifications[i]));
    };
    for (let i = 0; i < readNotifications.length; i++) {
        $fragment.append(createNotification(readNotifications[i]));
    };

    $number.textContent = unreadNotifications.length;
    $main.append($fragment);
});

d.addEventListener("click", evt => {
    if(evt.target === $button) {
        // *** Variables ***
        let result, $indicator;
        // *** Ejecución ***
        result = d.querySelectorAll(".notification--unread");
        result.forEach($element => {
            $indicator = $element.querySelector(".notification-txt-p__indicator");
            removeStateClass($element, "unread");
            addClass($indicator, "none");
        });
        $number.textContent = 0;
    };
});
