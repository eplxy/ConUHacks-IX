import { useLocation } from "react-router-dom";
import { TraitTracker } from "../models/models";

export default function ResultsPage() {
  const location = useLocation();

  return (
    <div>
      <h1>Results for {location.state.name}</h1>
      <div>Cashmere - Agreeableness: {(location.state.traitTracker as TraitTracker).Agreeableness}</div>
      <div>Gangus - Conscientiousness: {(location.state.traitTracker as TraitTracker).Conscientiousness}</div>
      <div>Margiela - Extroversion: {(location.state.traitTracker as TraitTracker).Extroversion}</div>
      <div>Darius - Neuroticism: {(location.state.traitTracker as TraitTracker).Neuroticism}</div>
      <div>Calpico - Openness: {(location.state.traitTracker as TraitTracker).Openness}</div>
    </div>
  );
}
