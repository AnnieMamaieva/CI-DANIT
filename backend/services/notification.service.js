import UsersRepository from "../repositories/users.repository.js";

class NotificationService {
  static async notifyNewPost(post, io) {
    if (!io) {
      console.log("No io available");
      return;
    }

    const users = await UsersRepository.getUsersForNotifications();

    users.forEach((user) => {
      io.emit("newspost:created", {
        channel: user.notificationChannel,
        title: post.header,
        text: post.text,
        link: `/newsposts/${post.id}`,
      });
    });
  }
}

export default NotificationService;
