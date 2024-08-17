import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface LoadingSkeletonProps {
    number: number;
    widths: number[]; // Array of widths for each td element
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({ number, widths }) => {
    // Validate the widths prop
    if (widths.length === 0) {
        throw new Error('The widths array must contain at least one width value.');
    }

    return (
        <>
            {Array.from({ length: number }).map((_, rowIndex) => (
                <tr key={rowIndex} className="hover:bg-gray-100">
                    {widths.map((width, colIndex) => (
                        <td
                            key={colIndex}
                            className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                            <Skeleton width={width} />
                        </td>
                    ))}
                </tr>
            ))}
        </>
    );
};
