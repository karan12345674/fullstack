// import React from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
// import { Badge } from "@Components/UI/Badge";
// import { Building2, Clock, DollarSign } from "lucide-react";
// import { format } from "date-fns";
// import { Skeleton } from "@Components/UI/Skeleton";

// const statusColors = {
//   trial: "bg-blue-100 text-blue-800 border-blue-200",
//   active: "bg-emerald-100 text-emerald-800 border-emerald-200",
//   suspended: "bg-red-100 text-red-800 border-red-200",
//   past_due: "bg-amber-100 text-amber-800 border-amber-200",
// };

// export default function ClientActivity({ clients = [], isLoading = false }) {
//   // 👉 अगर clients खाली है तो dummy data दिखाओ
//   if (!clients || clients.length === 0) {
//     clients = [
//       {
//         id: 1,
//         company_name: "TechCorp Pvt Ltd",
//         status: "active",
//         monthly_spend: 249.99,
//         signup_date: new Date(),
//         messages_sent_month: 320,
//       },
//       {
//         id: 2,
//         company_name: "AlphaSoft Solutions",
//         status: "trial",
//         monthly_spend: 0,
//         signup_date: new Date(),
//         messages_sent_month: 50,
//       },
//       {
//         id: 3,
//         company_name: "BlueSky Media",
//         status: "past_due",
//         monthly_spend: 120.75,
//         signup_date: new Date(),
//         messages_sent_month: 210,
//       },
//     ];
//   }

//   if (isLoading) {
//     return (
//       <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
//         <CardHeader>
//           <Skeleton className="h-6 w-32" />
//         </CardHeader>
//         <CardContent className="space-y-4">
//           {Array(5)
//             .fill(0)
//             .map((_, i) => (
//               <div key={i} className="flex items-center gap-3">
//                 <Skeleton className="w-10 h-10 rounded-full" />
//                 <div className="flex-1 space-y-2">
//                   <Skeleton className="h-4 w-3/4" />
//                   <Skeleton className="h-3 w-1/2" />
//                 </div>
//               </div>
//             ))}
//         </CardContent>
//       </Card>
//     );
//   }

//   return (
//     <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
//       <CardHeader className="border-b border-slate-100 bg-slate-50/50">
//         <CardTitle className="flex items-center gap-2">
//           <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
//             <Building2 className="w-4 h-4 text-violet-600" />
//           </div>
//           Recent Client Activity
//         </CardTitle>
//       </CardHeader>
//       <CardContent className="p-6">
//         <div className="space-y-4">
//           {clients.map((client) => (
//             <div
//               key={client.id}
//               className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50/50 transition-colors"
//             >
//               <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
//                 <Building2 className="w-5 h-5 text-slate-600" />
//               </div>

//               <div className="flex-1 min-w-0">
//                 <div className="flex items-center justify-between">
//                   <h4 className="font-medium text-slate-900 text-sm truncate">
//                     {client.company_name}
//                   </h4>
//                   <Badge className={statusColors[client.status]}>
//                     {client.status}
//                   </Badge>
//                 </div>

//                 <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
//                   <div className="flex items-center gap-1">
//                     <DollarSign className="w-3 h-3" />
//                     ${(client.monthly_spend || 0).toFixed(2)}
//                   </div>
//                   <div className="flex items-center gap-1">
//                     <Clock className="w-3 h-3" />
//                     {format(new Date(client.signup_date), "MMM d")}
//                   </div>
//                   <div>{client.messages_sent_month || 0} messages</div>
//                 </div>
//               </div>
//             </div>
//           ))}
//         </div>
//       </CardContent>
//     </Card>
//   );
// }



import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@Components/UI/Card";
import { Badge } from "@Components/UI/Badge";
import { Building2, Clock, DollarSign } from "lucide-react";
import { format, isValid } from "date-fns";
import { Skeleton } from "@Components/UI/Skeleton";

const statusColors = {
  trial: "bg-blue-100 text-blue-800 border-blue-200",
  active: "bg-emerald-100 text-emerald-800 border-emerald-200",
  suspended: "bg-red-100 text-red-800 border-red-200",
  past_due: "bg-amber-100 text-amber-800 border-amber-200",
};

export default function ClientActivity({ clients = [], isLoading = false }) {
  if (!clients || clients.length === 0) {
    clients = [
      { id: 1, company_name: "TechCorp Pvt Ltd", status: "active", monthly_spend: 249.99, signup_date: new Date(), messages_sent_month: 320 },
      { id: 2, company_name: "AlphaSoft Solutions", status: "trial", monthly_spend: 0, signup_date: new Date(), messages_sent_month: 50 },
      { id: 3, company_name: "BlueSky Media", status: "past_due", monthly_spend: 120.75, signup_date: new Date(), messages_sent_month: 210 },
    ];
  }

  if (isLoading) {
    return (
      <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
        <CardHeader><Skeleton className="h-6 w-32" /></CardHeader>
        <CardContent className="space-y-4">
          {Array(5).fill(0).map((_, i) => (
            <div key={i} className="flex items-center gap-3">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="shadow-sm border-0 bg-white/80 backdrop-blur-sm">
      <CardHeader className="border-b border-slate-100 bg-slate-50/50">
        <CardTitle className="flex items-center gap-2">
          <div className="w-8 h-8 bg-violet-100 rounded-lg flex items-center justify-center">
            <Building2 className="w-4 h-4 text-violet-600" />
          </div>
          Recent Client Activity
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <div className="space-y-4">
          {clients.map(client => (
            <div key={client.id} className="flex items-center gap-4 p-3 border border-slate-100 rounded-lg hover:bg-slate-50/50 transition-colors">
              <div className="w-10 h-10 bg-slate-200 rounded-full flex items-center justify-center">
                <Building2 className="w-5 h-5 text-slate-600" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-900 text-sm truncate">{client.company_name}</h4>
                  <Badge className={statusColors[client.status]}>{client.status}</Badge>
                </div>

                <div className="flex items-center gap-4 mt-1 text-xs text-slate-500">
                  <div className="flex items-center gap-1">
                    <DollarSign className="w-3 h-3" />
                    ₹{(client.monthly_spend || 0).toFixed(2)}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {client.signup_date && isValid(new Date(client.signup_date))
                      ? format(new Date(client.signup_date), "MMM d")
                      : "—"}
                  </div>
                  <div>{client.messages_sent_month || 0} messages</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}