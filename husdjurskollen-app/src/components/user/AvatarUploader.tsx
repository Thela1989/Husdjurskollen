import { useEffect, useMemo, useState } from "react";
import "./AvatarUploader.css";

interface AvatarUploaderProps {
  onAvatarChange?: (avatarUrl: string) => void;
}

const PRESET_AVATARS = [
  "/Images/avatars/avatar-bird.png",
  "/Images/avatars/avatar-bunny.png",
  "/Images/avatars/avatar-cat.png",
  "/Images/avatars/avatar-dog.png",
  "/Images/avatars/avatar-fish.png",
  "/Images/avatars/avatar-horse.png",
  "/Images/avatars/hamster.png",
];

export function AvatarUploader({ onAvatarChange }: AvatarUploaderProps) {
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [uploadedAvatar, setUploadedAvatar] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  const selectedAvatar = useMemo(
    () => uploadedAvatar || selectedPreset,
    [selectedPreset, uploadedAvatar],
  );

  useEffect(() => {
    if (selectedAvatar) {
      onAvatarChange?.(selectedAvatar);
    }
  }, [onAvatarChange, selectedAvatar]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const imageUrl = URL.createObjectURL(file);
    setUploadedAvatar((previous) => {
      if (previous) {
        URL.revokeObjectURL(previous);
      }
      return imageUrl;
    });
  };

  const handlePresetSelect = (avatarUrl: string) => {
    if (uploadedAvatar) {
      URL.revokeObjectURL(uploadedAvatar);
      setUploadedAvatar(null);
    }
    setSelectedPreset(avatarUrl);
  };

  useEffect(() => {
    return () => {
      if (uploadedAvatar) {
        URL.revokeObjectURL(uploadedAvatar);
      }
    };
  }, [uploadedAvatar]);

  return (
    <div className="avatar-uploader">
      <div className="avatar-actions">
        <button
          type="button"
          className="avatar-toggle-button"
          onClick={() => setIsExpanded((previous) => !previous)}
          aria-expanded={isExpanded}
        >
          {isExpanded ? "Dolj avatarer" : "Valj avatar"}
        </button>

        <div className="avatar-upload-group">
          <p className="avatar-upload-text">Eller</p>
          <label htmlFor="avatar-upload" className="avatar-upload-label">
            Ladda upp en bild
          </label>
          <input
            id="avatar-upload"
            type="file"
            accept="image/*"
            className="avatar-upload-input"
            onChange={handleImageChange}
          />
        </div>
      </div>

      {isExpanded && (
        <div className="avatar-panel">
          <div className="avatar-grid">
            {PRESET_AVATARS.map((avatarUrl) => {
              const isActive = !uploadedAvatar && selectedPreset === avatarUrl;

              return (
                <button
                  type="button"
                  key={avatarUrl}
                  className={`avatar-option ${isActive ? "active" : ""}`}
                  onClick={() => handlePresetSelect(avatarUrl)}
                  aria-label="Välj avatar"
                >
                  <img
                    src={avatarUrl}
                    alt="Avatar"
                    className="avatar-option-image"
                  />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {selectedAvatar && (
        <div className="avatar-preview">
          <img
            src={selectedAvatar}
            alt="Vald avatar"
            className="avatar-preview-image"
          />
        </div>
      )}
    </div>
  );
}
