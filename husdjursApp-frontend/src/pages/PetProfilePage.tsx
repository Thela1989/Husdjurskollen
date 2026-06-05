import PetHeader from "../components/pets/PetHeader";
import PetProfileCard from "../components/pets/petProfileCard";
import PetFeatureCard from "../components/pets/PetfeatureCard";
import PetStatusCard from "../components/pets/PetStatusCard";

function PetProfilePage() {
  return (
    <main className="pet-profile-page">
      <PetHeader />

      <section className="pet-profile-title">
        <h1>Hedvig</h1>
        <p>Katt • 3 år</p>
      </section>

      <PetProfileCard />

      <section className="pet-feature-grid">
        <PetFeatureCard title="Hälsa" />
        <PetFeatureCard title="Skötsel" />
        <PetFeatureCard title="Påminnelser" />
        <PetFeatureCard title="Trygghetsplan" />
      </section>

      <PetStatusCard />
    </main>
  );
}

export default PetProfilePage;
