
import "./AuthLayout.css";

interface AuthLayoutProps {
    title: string;
    subtitle: string;
    children: React.ReactNode;
}

function AuthLayout({ title, subtitle, children }: AuthLayoutProps) {
    return (
        <div className="auth-layout">
            <div className="auth-card">
                <h1>{title}</h1>
                <p className="auth-subtitle">{subtitle}</p>

                <div className="auth-content">
                    {children}
                </div>
            </div>
        </div>
    );
}

export default AuthLayout;
