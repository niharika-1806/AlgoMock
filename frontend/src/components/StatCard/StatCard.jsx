import { CheckCircle2, Mic, FileCode2, Flame, Award } from "lucide-react";
import "./StatCard.css";

function StatCard({ title, value }) {
    const getIcon = () => {
        const t = (title || "").toLowerCase();
        if (t.includes("problem") || t.includes("solved")) {
            return <CheckCircle2 size={20} className="stat-icon-svg" />;
        }
        if (t.includes("interview")) {
            return <Mic size={20} className="stat-icon-svg" />;
        }
        if (t.includes("review") || t.includes("code")) {
            return <FileCode2 size={20} className="stat-icon-svg" />;
        }
        if (t.includes("streak") || t.includes("daily")) {
            return <Flame size={20} className="stat-icon-svg streak-icon" />;
        }
        return <Award size={20} className="stat-icon-svg" />;
    };

    return (
        <div className="stat-card">
            <div className="stat-card-header">
                <span className="stat-title">{title}</span>
                <div className="stat-icon-container">
                    {getIcon()}
                </div>
            </div>
            <div className="stat-card-body">
                <p className="stat-value">{value}</p>
            </div>
        </div>
    );
}

export default StatCard;