import { getServerInfo } from "@bsnext/mta-ase-query";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    try {
        const serverInfo = await getServerInfo(process.env.MTA_HOST, parseInt(process.env.MTA_PORT), 5000);
        delete serverInfo.ip;
        delete serverInfo.port;
        delete serverInfo.private;
        delete serverInfo.gamemode;
        delete serverInfo.rules;
        res.status(200).json(serverInfo);
    } catch (e) {
        console.error(e);

        res.status(500).json({
            error: "El servidor no está disponible.",
            details: e.message,
        });
    }
};
