// src/components/shared/Button.jsx
import PropTypes from 'prop-types'

const Button = ({ variant = 'primary', children, className, ...props }) => {
    const baseStyles = 'flex items-center justify-center px-4 py-2 rounded-lg font-medium transition-colors'

    const variants = {
        primary: 'text-black',
        outline: 'border border-gray-300 text-gray-700 hover:bg-gray-50'
    }

    return (
        <button
            className={`${baseStyles} ${variants[variant]} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

Button.propTypes = {
    variant: PropTypes.oneOf(['primary', 'outline']),
    children: PropTypes.node.isRequired,
    className: PropTypes.string
}

Button.defaultProps = {
    variant: 'primary',
    className: ''
}

export default Button