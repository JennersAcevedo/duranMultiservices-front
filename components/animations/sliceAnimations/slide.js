import * as motion from "motion/react-client"

export default function SliceAnimation({ children, style }) {
    return (
        <motion.div
        initial={{ x: "-100%", opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
            style={style}
        >
            {children}
        </motion.div>
    );
}