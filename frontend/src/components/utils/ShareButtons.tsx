import {
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
} from "react-share";
import {
  FaInstagram,
  FaTwitter,
  FaLinkedinIn,
  FaWhatsapp,
} from "react-icons/fa";

interface ShareButtonsProps {
  title: string;
  message: string; // Custom message to include with the share
  center: boolean;
}

const ShareButtons = ({ title, message, center }: ShareButtonsProps) => {
  const url = window.location.href;

  const shareOnInstagram = () => {
    const encodedUrl = encodeURIComponent(url);
    const encodedMessage = encodeURIComponent(`${title} - ${message}`);
    const instagramUrl = `https://www.instagram.com/direct/new/?text=${encodedMessage}%20${encodedUrl}`;

    window.open(instagramUrl, "_blank");
  };

  return (
    <div
      className={`flex flex-col ${center ? "justify-center items-center" : ""}`}
    >
      <div className="font-semibold text-accent text-sm">
        Share with your friends and hate together
      </div>
      <div className="flex gap-4 mt-2">
        {/* Instagram */}
        <button onClick={shareOnInstagram} aria-label="Share on Instagram">
          <FaInstagram className="text-pink-600" size={24} />
        </button>

        {/* Twitter */}
        <TwitterShareButton url={url} title={`${title} - ${message}`}>
          <FaTwitter
            className="text-blue-400"
            size={24}
            aria-label="Share on Twitter"
          />
        </TwitterShareButton>

        {/* LinkedIn */}
        <LinkedinShareButton url={url} summary={message} title={title}>
          <FaLinkedinIn
            className="text-blue-700"
            size={24}
            aria-label="Share on LinkedIn"
          />
        </LinkedinShareButton>

        {/* WhatsApp */}
        <WhatsappShareButton url={url} title={`${title} - ${message}`}>
          <FaWhatsapp
            className="text-green-500"
            size={24}
            aria-label="Share on WhatsApp"
          />
        </WhatsappShareButton>
      </div>
    </div>
  );
};

export default ShareButtons;
