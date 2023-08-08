import "./bootstrap";
import "../css/app.css";

import React from "react";
import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { ProSidebarProvider } from "react-pro-sidebar";

createInertiaApp({
    title: (title) => `${title} - Sipengat`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        root.render(
            <ProSidebarProvider>
                <App {...props} />
            </ProSidebarProvider>
        );
    },
    progress: {
        color: "#f97316",
    },
});
