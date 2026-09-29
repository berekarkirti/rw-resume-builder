import React from 'react';

export const PdfSafeHeading = ({ icon: Icon, children, color = '#C8102E', thick = false }) => (
  <div
    className={`pb-1.5 mb-2.5 ${thick ? 'border-b-2' : 'border-b'}`}
    style={{ borderColor: color }}
  >
    <table className="border-collapse">
      <tbody>
        <tr>
          {Icon ? (
            <td className="align-middle pr-1.5 w-4">
              <Icon className="w-3.5 h-3.5 block" style={{ color }} />
            </td>
          ) : null}
          <td className="align-middle">
            <span className="text-xs font-black uppercase tracking-wider text-gray-900 leading-none">
              {children}
            </span>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
);

export const PdfSafeIconText = ({ icon: Icon, children, iconClassName = 'w-3 h-3', className = '' }) => (
  <table className={`border-collapse ${className}`}>
    <tbody>
      <tr>
        {Icon ? (
          <td className="align-middle pr-1">
            <Icon className={`${iconClassName} block`} />
          </td>
        ) : null}
        <td className="align-middle">{children}</td>
      </tr>
    </tbody>
  </table>
);
