import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const notices = await prisma.notice.findMany({
      orderBy: [{ createdAt: "desc" }],
    });
    const urgent = notices.filter((n) => n.priority === "Urgent");
    const normal = notices.filter((n) => n.priority === "Normal");
    return res.status(200).json([...urgent, ...normal]);
  }

  if (req.method === "POST") {
    const { title, body, category, priority, publishDate, image } = req.body;

    if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
    if (!body || !body.trim()) return res.status(400).json({ error: "Body is required." });
    if (!category) return res.status(400).json({ error: "Category is required." });
    if (!priority) return res.status(400).json({ error: "Priority is required." });
    if (!publishDate || isNaN(new Date(publishDate).getTime()))
      return res.status(400).json({ error: "A valid date is required." });

    const notice = await prisma.notice.create({
      data: {
        title: title.trim(),
        body: body.trim(),
        category,
        priority,
        publishDate: new Date(publishDate),
        image: image || null,
      },
    });
    return res.status(201).json(notice);
  }

  res.setHeader("Allow", ["GET", "POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}