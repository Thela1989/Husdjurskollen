interface PetProfileCardProps {
  name: string;
  subtitle: string;
  avatarUrl?: string | null;
}

export default function PetProfileCard({
  name,
  subtitle,
  avatarUrl,
}: PetProfileCardProps) {
  const fallbackInitial = name ? name.charAt(0).toUpperCase() : "?";

  return (
    <div className="pet-profile-card">
      <div className="pet-profile-card-avatar" aria-label={`${name} avatar`}>
        {avatarUrl ? (
          <img
            src={avatarUrl}
            alt={`${name} avatar`}
            className="pet-avatar-image"
          />
        ) : (
          fallbackInitial
        )}
      </div>

      <h2>{name}</h2>
      <p>{subtitle}</p>
    </div>
  );
}
