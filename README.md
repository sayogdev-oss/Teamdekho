# TeamDekho - Free HD Video Meetings and Collaboration

<div align="center">
    <a href="https://teamdekho.in" target="_blank">
        <img src="public/images/logo.png" alt="TeamDekho Logo" width="120">
    </a>
</div>

<h1 align="center">TeamDekho</h1>

<p align="center">
    <strong>TeamDekho</strong> is a <strong>self-hosted, open-source video conferencing</strong> platform built on <a href="https://mediasoup.org" target="_blank">mediasoup</a> SFU architecture for scalable real-time communication. It provides a powerful, cost-effective alternative to platforms like Zoom, Google Meet, and Microsoft Teams, focusing on privacy, control, and efficiency.
</p>

<p align="center">
    Deploy TeamDekho on your own server to gain full control over your data, privacy, and infrastructure. Enjoy a robust video conferencing solution without the high costs and vendor lock-in.
</p>

<p align="center">
    <a href="https://teamdekho.in">Try Live Demo</a> · <a href="https://teamdekho.in/privacy">Privacy Policy</a> · <a href="https://docs.teamdekho.com">Documentation</a> · <a href="https://github.com/sayogdev-oss/TeamDekho/issues">Report Issue</a>
</p>

## ✨ Why TeamDekho?

|                    | TeamDekho                                                                                                                                       | Zoom / Meet / Teams         |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------- |
| 💰 **Cost**        | Free & Open Source (AGPLv3)                                                                                                                     | Paid plans                  |
| 🏠 **Self-hosted** | ✅ Full control over your data                                                                                                                  | ❌ Cloud only               |
| 🔒 **Security**    | ✅ End-to-end encryption, host controls, lobby                                                                                                  | ⚠️ Varies, often cloud-based |
| 🌐 **Scalability**  | ✅ Designed for massive scale with WebRTC SFU                                                                                                   | ✅ High scalability         |
| ⚙️ **Customization** | ✅ Fully customizable, open-source                                                                                                              | ❌ Limited                  |
| 🌍 **Bandwidth**    | ✅ Highly efficient, adaptive bitrate, SVC/Simulcast                                                                                            | ✅ Optimized                |
| 💻 **UX**          | ✅ Instant join, low latency, adaptive UI                                                                                                       | ✅ High quality             |

### Key Features:

-   🗣️ HD Audio & Video Calls · Screen Sharing · Whiteboard · Document PiP
-   💬 Real-time Chat · File Sharing · Polls · Emoji Reactions · AI Chat integration (ChatGPT, DeepSeek)
-   🔒 SRTP Encryption · Lobby & Passcode · Host Controls · IP Whitelist · JWT Auth · OIDC Integration
-   📈 Analytics & Monitoring · Webhook Events · Recording · RTMP Live Streaming
-   📱 Mobile Support · Virtual Backgrounds · Keyboard Shortcuts · Multi-language UI

## 🚀 Quick Start (Self-Hosting)

**1. Clone the repository:**

```bash
git clone https://github.com/sayogdev-oss/TeamDekho.git
cd TeamDekho
```

**2. Configuration:**

Copy the example configuration file:

```bash
cp app/src/config.template.js app/src/config.js
cp .env.template .env
```

Edit `app/src/config.js` and `.env` to suit your needs.

**3. Install Dependencies:**

```bash
npm install
```

**4. Run the application:**

```bash
npm start
```

For more detailed instructions, refer to our [Documentation](https://docs.teamdekho.com).

## 🐳 Docker Deployment

**1. Clone the repository:**

```bash
git clone https://github.com/sayogdev-oss/TeamDekho.git
cd TeamDekho
```

**2. Configuration:**

Copy the example configuration files:

```bash
cp app/src/config.template.js app/src/config.js
cp .env.template .env
```

Edit `app/src/config.js` and `.env` to suit your needs.

**3. Build and run with Docker Compose:**

```bash
docker-compose up --build -d
```

## 📄 License

TeamDekho is free and open-source under the terms of AGPLv3 (GNU Affero General Public License v3.0). Please respect the license conditions. In particular, modifications need to be free as well and made available to the public. Get a quick overview of the license at [Choose an open source license](https://choosealicense.com/licenses/agpl-3.0/).

## ❤️ Support Our Project

If you find TeamDekho indispensable for your needs, consider supporting its development. Your contributions help us maintain and improve this platform for everyone. We believe in open-source and appreciate any help to keep this project thriving.

Built with ❤️ by TeamDekho Team.
