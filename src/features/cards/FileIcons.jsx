import { Archive, File, Image, MoreHorizontal, Music } from "lucide-react";


export const getCategoryIcon = (cat) => {
    switch (cat) {
      case "Video":
        return <File className="h-4 w-4" />;
      case "Music":
        return <Music className="h-4 w-4" />;
      case "Pictures":
        return <Image className="h-4 w-4" />;
      case "Compressed":
        return <Archive className="h-4 w-4" />;
      default:
        return <MoreHorizontal className="h-4 w-4" />;
    }
};