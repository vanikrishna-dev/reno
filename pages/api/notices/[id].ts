import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  const noticeId = parseInt(id as string);

  if (isNaN(noticeId)) return res.status(400).json({ error: "Invalid ID." });

  if (req.method === "GET") {
    const notice = await prisma.notice.findUnique({ where: { id: noticeId } });
    if (!notice) return res.status(404).json({ error: "Not found." });
    return res.status(200).json(notice);
  }

  if (req.method === "PUT") {
    try {
      const { title, body, category, priority, publishDate, image } = req.body;

      if (!title || !title.trim()) return res.status(400).json({ error: "Title is required." });
      if (!body || !body.trim()) return res.status(400).json({ error: "Body is required." });
      if (!category) return res.status(400).json({ error: "Category is required." });
      if (!priority) return res.status(400).json({ error: "Priority is required." });
      if (!publishDate || isNaN(new Date(publishDate).getTime()))
        return res.status(400).json({ error: "A valid date is required." });

      // Temporary safety: truncate image URL to avoid DB column overflow (P2000)
      const MAX_IMAGE_LEN = 191; // match existing column limit until migration is applied
      const safeImage = image ? (String(image).length > MAX_IMAGE_LEN ? String(image).slice(0, MAX_IMAGE_LEN) : String(image)) : null;

      const notice = await prisma.notice.update({
        where: { id: noticeId },
        data: {
          title: title.trim(),
          body: body.trim(),
          category,
          priority,
          publishDate: new Date(publishDate),
          image: safeImage,
        },
      });
      return res.status(200).json(notice);
    } catch (err: any) {
      console.error(err);
      return res.status(500).json({ error: err.message || "Internal Server Error" });
    }
  }

  if (req.method === "DELETE") {
    await prisma.notice.delete({ where: { id: noticeId } });
    return res.status(200).json({ message: "Deleted successfully." });
  }

  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}