import { AsyncStorage } from "react-native";
import { Notifications } from "expo";

import * as Permissions from "expo-permissions";

const NOTIFICATION_KEY = "Flashcard:notifications";
const CHANNEL_ID = "Reminder";

/**
 * This file contains functions to show different notifications.
 */
export function clearLocalNotification() {
	return AsyncStorage.removeItem(NOTIFICATION_KEY).then(Notifications.cancelAllScheduledNotificationsAsync);
}

function createNotification() {
	return {
		title: "Reminder",
		body: "👋 Don't forget to study today!",

		ios: {
			sound: true,
		},
		android: {
			channelId: CHANNEL_ID,
			sticky: false,
			color: "red",
		},
	};
}

function createChannel() {
	return {
		name: "Daily Reminder",
		description: "A daily reminder to study your flashcards.",
		sound: true,
		priority: "high",
	};
}

export function setLocalNotification() {
	console.log("In setLocalNotification");
	AsyncStorage.getItem(NOTIFICATION_KEY)
		.then(JSON.parse)
		.then((data) => {
			if (data === null) {
				console.log("data was null setting notification");
				Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
					if (status === "granted") {
						Notifications.createChannelAndroidAsync(CHANNEL_ID, createChannel())
							.then((val) => console.log("channel return:", val))
							.then(() => {
								Notifications.cancelAllScheduledNotificationsAsync();

								const tomorrow = new Date();
								tomorrow.setDate(tomorrow.getDate() + 1);
								tomorrow.setHours(20);
								tomorrow.setMinutes(0);

								Notifications.scheduleLocalNotificationAsync(createNotification(), {
									time: tomorrow,
									repeat: "day",
								});

								AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true));
							})
							.catch((error) => {
								console.log("error", error);
							});
					}
				});
			} else {
				console.log("notification was already set");
			}
		});
}
